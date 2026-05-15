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

@Service
public class ContactServices {


    @Value("${spring.mail.username}")
    private String fromAddress; // Use your configured sender email

    @Value("${pitlane.contact.to:selorenzano2@gmail.com}")
    private String toAddress; // can configure a destination in application.properties

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
                    e.getMessage());
        }
        return new ContactResponse(
                ContactStatus.SUCCESS,
                "Formulario recibido correctamente");
    }

    private void sendContactEmail(ContactRequest request) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromAddress);
        helper.setTo(toAddress);
        helper.setSubject("Nuevo mensaje de contacto desde Pitlane Holding");

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
                request.getName(),
                request.getEmail(),
                request.getNumber(),
                request.getCompany(),
                safeMessage
        );

        helper.setText(content, true);

        ClassPathResource banner = new ClassPathResource("static/images/email-banner.png");
        helper.addInline("bannerImage", banner);

        mailSender.send(message);
    }

    private void sendConfirmationEmail(ContactRequest request) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromAddress);
        helper.setTo(request.getEmail());
        helper.setSubject("Gracias por contactar con Pitlane Holding");

        String content = """
    <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
      
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">

        <!-- Header Image -->
        <img src="cid:bannerImage" alt="Pitlane Holding" style="width: 100%%; display: block;">

        <div style="padding: 25px; text-align: center; border-bottom: 1px solid #e6e6e6;">
          <h2 style="margin: 0; font-size: 22px; color: #0b0b0c;">¡Gracias por tu mensaje!</h2>
          <p style="margin: 8px 0 0; color: #555;">
            Hemos recibido tu formulario de contacto. Nuestro equipo te responderá lo antes posible.
          </p>
        </div>

        <div style="padding: 25px; font-size: 15px; color: #333;">
          <p>Hola <strong>%s</strong>,</p>
          <p>Gracias por ponerte en contacto con <strong>Pitlane Holding</strong>. Este es un mensaje automático para confirmarte que hemos recibido tu solicitud.</p>
          <p>Nos pondremos en contacto contigo en breve.</p>
        </div>

        <div style="padding: 20px; text-align: center; font-size: 12px; color: #777; background: #fafbfc; border-top: 1px solid #e6e6e6;">
          © Pitlane Holding — Este mensaje fue generado automáticamente.
        </div>

      </div>
    </div>
    """.formatted(request.getName());

        helper.setText(content, true);

        ClassPathResource banner = new ClassPathResource("static/images/email-banner.png");
        helper.addInline("bannerImage", banner);

        mailSender.send(message);
    }


    private String escapeHtml(String text) {
        if (text == null) return "";
        return text.replace("<", "&lt;").replace(">", "&gt;");
    }
}
