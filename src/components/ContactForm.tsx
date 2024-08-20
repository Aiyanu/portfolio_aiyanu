"use client";
import { z } from "zod";
import {
  FormMessage,
  FormDescription,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().min(2).max(50).trim(),
  subject: z.string().min(2).max(50).trim(),
  message: z.string().min(2).max(60),
});

const ContactForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(() => {
        console.log(values);
      })
      .then(() => {
        toast("Email Sent Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast("Email Failed to send");
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {Array("name", "email", "subject", "message").map((name, index) => {
          return (
            <FormField
              key={index}
              control={form.control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="capitalize">{name}</FormLabel>
                    <FormControl>
                      <Input placeholder={name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ContactForm;
