import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_l8mddjt'; 
  private templateId = 'template_ya0kmm5';
  private publicKey = 'oKLWR0MzNPdU3UYKk'; 

  constructor() {
    // Inicializar EmailJS
    emailjs.init(this.publicKey);
  }

  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      console.log('📧 Enviando e-mail para dionisiobraga551@gmail.com...');
      
      // Preparar os dados do template
      const templateParams = {
        from_name: emailData.name,
        from_email: emailData.email,
        subject: emailData.subject || 'Mensagem do Portfolio',
        message: emailData.message,
        to_email: 'dionisiobraga551@gmail.com'
      };

      // Enviar e-mail usando EmailJS
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('✅ E-mail enviado com sucesso para dionisiobraga551@gmail.com!');
      console.log('📋 Detalhes:', {
        status: response.status,
        text: response.text,
        remetente: emailData.name,
        email: emailData.email,
        assunto: emailData.subject
      });
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar e-mail:', error);
      
      // Log detalhado do erro para debugging
      if (error instanceof Error) {
        console.error('Tipo do erro:', error.name);
        console.error('Mensagem:', error.message);
      }
      
      return false;
    }
  }

  // Método alternativo usando fetch para um backend próprio (caso queira implementar depois)
  async sendEmailViaBackend(emailData: EmailData): Promise<boolean> {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...emailData,
          to: 'dionisiobraga551@gmail.com'
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao enviar e-mail via backend:', error);
      return false;
    }
  }
}