"use client";
import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .transform((s) => s.toLowerCase().trim()),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be at most 50 characters" })
    .transform((s) => s.trim()),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters" })
    .max(50, { message: "Subject must be at most 50 characters" })
    .transform((s) => s.trim()),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(2000, { message: "Message must be at most 2000 characters" })
    .transform((s) => s.trim()),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Expose reCAPTCHA key to client by prefixing NEXT_PUBLIC_
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      message: "",
    },
  });

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token ?? "");
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    const { name, subject, email, message } = values;

    // Basic guard — zod should have already validated, but keep for extra safety
    if (!name || !subject || !email || !message) {
      toast("Please complete all fields");
      setIsLoading(false);
      return;
    }
    if (!captchaToken) {
      toast("Please complete the CAPTCHA.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, captchaToken }),
      });

      if (res.ok) {
        toast("Email sent successfully");
        form.reset();
        // reset reCAPTCHA
        recaptchaRef.current?.reset();
        setCaptchaToken("");
      } else {
        // attempt to read server message (optional)
        let msg = "Email failed to send";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch (e) {
          /* ignore JSON parse errors */
        }
        toast(msg);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast("An error occurred while sending email.");
    } finally {
      setIsLoading(false);
    }
  }

  // typed list so FormField name prop matches schema keys
  const fields: Array<keyof FormValues> = ["name", "email", "subject", "message"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:min-w-96">
        {fields.map((name) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">{name}</FormLabel>
                <FormControl>
                  {name === "message" ? (
                    <Textarea {...field} />
                  ) : (
                    // set input type for email for better mobile keyboards & validation
                    <Input {...field} type={name === "email" ? "email" : "text"} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Only render ReCAPTCHA if key exists; otherwise show a small notice */}
        {sitekey ? (
          <ReCAPTCHA ref={recaptchaRef} sitekey={sitekey} onChange={handleCaptchaChange} />
        ) : (
          <p className="text-sm text-muted-foreground">
            ReCAPTCHA key missing. Set <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> in your environment.
          </p>
        )}

        <Button className="bg-blue-600" type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
