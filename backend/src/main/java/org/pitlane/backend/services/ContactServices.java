package org.pitlane.backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.pitlane.backend.model.dto.ContactRequest;
import org.pitlane.backend.model.dto.ContactResponse;
import org.pitlane.backend.model.status.ContactStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ContactServices {

    private static final String DEFAULT_LANGUAGE = "en";

    private static final Set<String> SUPPORTED_LANGUAGES = Set.of(
            "en", "es", "fr", "de", "pt", "it"
    );

    @Value("${spring.mail.username}")
    private String fromAddress;

    @Value("${pitlane.contact.to:selorenzano2@gmail.com}")
    private String toAddress;

    private final JavaMailSender mailSender;

    public ContactServices(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public ContactResponse processContact(ContactRequest request) {
        try {
            sendContactEmail(request);
            sendConfirmationEmail(request);
        }
        catch (MessagingException e) {
            e.printStackTrace();
            return new ContactResponse(
                    ContactStatus.MESSAGING_EXCEPTION,
                    e.getMessage()
            );
        }

        return new ContactResponse(
                ContactStatus.SUCCESS,
                "Formulario recibido correctamente"
        );
    }

    private void sendContactEmail(ContactRequest request) throws MessagingException {
        String language = normalizeLanguage(request.getLanguage());
        String languageName = getLanguageName(language);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("PitlaneHolding <" + fromAddress + ">");
        helper.setTo(toAddress);
        helper.setSubject("Nuevo mensaje de contacto desde Pitlane Holding");

        String safeName = escapeHtml(request.getName());
        String safeEmail = escapeHtml(request.getEmail());
        String safeNumber = escapeHtml(request.getNumber());
        String safeCompany = escapeHtml(request.getCompany());
        String safeMessage = escapeHtml(request.getMessage()).replace("\n", "<br>");

        String content = """
        <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">

            <img src="cid:bannerImage" alt="Pitlane Holding" style="width: 100%%; display: block;">

            <div style="padding: 25px; text-align: center; border-bottom: 1px solid #e6e6e6;">
              <h2 style="margin: 0; font-size: 22px; color: #0b0b0c;">Nuevo mensaje de contacto</h2>
              <p style="margin: 8px 0 0; color: #555;">Has recibido un nuevo formulario desde la web de Pitlane Holding.</p>
            </div>

            <div style="padding: 25px; font-size: 15px; color: #333;">
              <p><strong>Nombre:</strong> %s</p>
              <p><strong>Email:</strong> %s</p>
              <p><strong>Teléfono:</strong> %s</p>
              <p><strong>Empresa / Fondo:</strong> %s</p>
              <p><strong>Idioma / Language:</strong> %s (%s)</p>

              <p style="margin-top: 20px;"><strong>Mensaje:</strong></p>
              <div style="background: #f0f2f5; padding: 12px; border-radius: 6px; color: #444; line-height: 1.5;">
                %s
              </div>
            </div>

            <div style="padding: 20px; text-align: center; font-size: 12px; color: #777; background: #fafbfc; border-top: 1px solid #e6e6e6;">
              © Pitlane Holding — Este mensaje fue generado automáticamente.
            </div>
          </div>
        </div>
        """.formatted(
                safeName,
                safeEmail,
                safeNumber,
                safeCompany,
                languageName,
                language,
                safeMessage
        );

        helper.setText(content, true);

        ClassPathResource banner = new ClassPathResource("static/images/email-banner.png");
        helper.addInline("bannerImage", banner);

        mailSender.send(message);
    }

    private void sendConfirmationEmail(ContactRequest request) throws MessagingException {
        String language = normalizeLanguage(request.getLanguage());
        EmailTexts texts = getEmailTexts(language);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("PitlaneHolding <" + fromAddress + ">");
        helper.setTo(request.getEmail());
        helper.setSubject(texts.subject());

        String safeName = escapeHtml(request.getName());

        String content = """
        <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
          
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">

            <img src="cid:bannerImage" alt="Pitlane Holding" style="width: 100%%; display: block;">

            <div style="padding: 25px; text-align: center; border-bottom: 1px solid #e6e6e6;">
              <h2 style="margin: 0; font-size: 22px; color: #0b0b0c;">%s</h2>
              <p style="margin: 8px 0 0; color: #555;">
                %s
              </p>
            </div>

            <div style="padding: 25px; font-size: 15px; color: #333;">
              <p>%s <strong>%s</strong>,</p>
              <p>%s</p>
              <p>%s</p>
            </div>

            <div style="padding: 20px; text-align: center; font-size: 12px; color: #777; background: #fafbfc; border-top: 1px solid #e6e6e6;">
              © Pitlane Holding — %s
            </div>

          </div>
        </div>
        """.formatted(
                texts.title(),
                texts.subtitle(),
                texts.greeting(),
                safeName,
                texts.body(),
                texts.closing(),
                texts.footer()
        );

        helper.setText(content, true);

        ClassPathResource banner = new ClassPathResource("static/images/email-banner.png");
        helper.addInline("bannerImage", banner);

        mailSender.send(message);
    }

    private String normalizeLanguage(String language) {
        if (language == null || language.isBlank()) {
            return DEFAULT_LANGUAGE;
        }

        String normalizedLanguage = language.trim().toLowerCase();

        if (normalizedLanguage.contains("-")) {
            normalizedLanguage = normalizedLanguage.substring(0, normalizedLanguage.indexOf("-"));
        }

        if (!SUPPORTED_LANGUAGES.contains(normalizedLanguage)) {
            return DEFAULT_LANGUAGE;
        }

        return normalizedLanguage;
    }

    private String getLanguageName(String language) {
        return switch (language) {
            case "es" -> "Spanish";
            case "fr" -> "French";
            case "de" -> "German";
            case "pt" -> "Portuguese";
            case "it" -> "Italian";
            default -> "English";
        };
    }

    private EmailTexts getEmailTexts(String language) {
        return switch (language) {
            case "es" -> new EmailTexts(
                    "Gracias por contactar con Pitlane Holding",
                    "¡Gracias por tu mensaje!",
                    "Hemos recibido tu formulario de contacto. Nuestro equipo te responderá lo antes posible.",
                    "Hola",
                    "Gracias por ponerte en contacto con Pitlane Holding. Este es un mensaje automático para confirmarte que hemos recibido tu solicitud.",
                    "Nos pondremos en contacto contigo en breve.",
                    "Este mensaje fue generado automáticamente."
            );

            case "fr" -> new EmailTexts(
                    "Merci d’avoir contacté Pitlane Holding",
                    "Merci pour votre message !",
                    "Nous avons bien reçu votre formulaire de contact. Notre équipe vous répondra dans les plus brefs délais.",
                    "Bonjour",
                    "Merci d’avoir contacté Pitlane Holding. Ceci est un message automatique pour confirmer que nous avons bien reçu votre demande.",
                    "Nous vous contacterons prochainement.",
                    "Ce message a été généré automatiquement."
            );

            case "de" -> new EmailTexts(
                    "Vielen Dank für Ihre Kontaktaufnahme mit Pitlane Holding",
                    "Vielen Dank für Ihre Nachricht!",
                    "Wir haben Ihr Kontaktformular erhalten. Unser Team wird sich so schnell wie möglich bei Ihnen melden.",
                    "Hallo",
                    "Vielen Dank, dass Sie Pitlane Holding kontaktiert haben. Dies ist eine automatische Nachricht zur Bestätigung, dass wir Ihre Anfrage erhalten haben.",
                    "Wir werden uns in Kürze bei Ihnen melden.",
                    "Diese Nachricht wurde automatisch erstellt."
            );

            case "pt" -> new EmailTexts(
                    "Obrigado por contactar a Pitlane Holding",
                    "Obrigado pela sua mensagem!",
                    "Recebemos o seu formulário de contacto. A nossa equipa responderá o mais brevemente possível.",
                    "Olá",
                    "Obrigado por entrar em contacto com a Pitlane Holding. Esta é uma mensagem automática para confirmar que recebemos o seu pedido.",
                    "Entraremos em contacto consigo em breve.",
                    "Esta mensagem foi gerada automaticamente."
            );

            case "it" -> new EmailTexts(
                    "Grazie per aver contattato Pitlane Holding",
                    "Grazie per il tuo messaggio!",
                    "Abbiamo ricevuto il tuo modulo di contatto. Il nostro team ti risponderà il prima possibile.",
                    "Ciao",
                    "Grazie per aver contattato Pitlane Holding. Questo è un messaggio automatico per confermare che abbiamo ricevuto la tua richiesta.",
                    "Ti contatteremo a breve.",
                    "Questo messaggio è stato generato automaticamente."
            );

            default -> new EmailTexts(
                    "Thank you for contacting Pitlane Holding",
                    "Thank you for your message!",
                    "We have received your contact form. Our team will reply as soon as possible.",
                    "Hello",
                    "Thank you for contacting Pitlane Holding. This is an automatic message to confirm that we have received your request.",
                    "We will contact you shortly.",
                    "This message was generated automatically."
            );
        };
    }

    private String escapeHtml(String text) {
        if (text == null) {
            return "";
        }

        return text
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }

    private record EmailTexts(
            String subject,
            String title,
            String subtitle,
            String greeting,
            String body,
            String closing,
            String footer
    ) {
    }
}