import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Nachricht gesendet",
      description: "Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="mt-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Kontakt & Vorschläge</h2>
        <p className="text-muted-foreground mb-8 text-center">
          Haben Sie Fragen oder Vorschläge zur Verbesserung? Wir freuen uns über Ihre Nachricht.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              placeholder="Ihre E-Mail-Adresse"
              {...register("email", { 
                required: "E-Mail ist erforderlich",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Ungültige E-Mail-Adresse"
                }
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Input
              placeholder="Betreff"
              {...register("subject", { required: "Betreff ist erforderlich" })}
            />
            {errors.subject && (
              <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
            )}
          </div>
          
          <div>
            <Textarea
              placeholder="Ihre Nachricht"
              className="min-h-[150px]"
              {...register("message", { required: "Nachricht ist erforderlich" })}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;