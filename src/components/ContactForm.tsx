"use client";
import { useState } from "react";
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
  email: z.string().email().toLowerCase(),
  name: z.string().min(2).max(50).trim(),
  subject: z.string().min(2).max(50).trim(),
  message: z.string().max(60),
});

const ContactForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sitekey = process.env.RECAPTCHA_SITE_KEY!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      message: "",
    },
  });

  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      setCaptchaToken(token);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Validate captcha token before submission
    setIsLoading(true);
    const { name, subject, email, message } = values;

    if (!name || !subject || !email || !message) {
      toast("Please Complete all field");
      return;
    }
    if (!captchaToken) {
      toast("Please complete the CAPTCHA.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, captchaToken }),
      });

      if (response.ok) {
        toast("Email Sent Successfully");
        setIsLoading(false);
        form.reset(); // Reset form after successful submission
      } else {
        toast("Email Failed to send");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast("An error occurred while sending email.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {["name", "email", "subject", "message"].map((name, index) => {
          return (
            <FormField
              key={index}
              control={form.control}
              //@ts-ignore
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{name}</FormLabel>
                  <FormControl>
                    {name === "message" ? (
                      <Textarea placeholder={name} {...field} />
                    ) : (
                      <Input placeholder={name} {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <ReCAPTCHA
          sitekey={"6LfMfisqAAAAAC3o2Yl-z2a0PhB5U-qOgFfRCuTH"}
          onChange={handleCaptchaChange}
        />
        <Button className="bg-blue-600" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
