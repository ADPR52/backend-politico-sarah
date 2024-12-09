import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "servicios.portalsarah@futurumprojects.co",
    //     pass: "Sistemas10",
    //   },
    service: "gmail",
      auth: {
        user: "adprkirito@gmail.com",
        pass: "tpwb zpul uecf xgan",
      },
    });
  }

  async sendEmail(to: string, user: string, numDoc: number) {
    const mailOptions = {
      from: "servicios.portalsarah@futurumprojects.co",
      to,
      subject: "Notificación de Registro Sospechoso",
      html: `
      <html>
        <head>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background-color: #eef2f7;
                    color: #4a4a4a;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    background-color: #ffffff;
                    border: 1px solid #ddd; /* Borde general alrededor de la carta */
                    border-radius: 12px;
                    padding: 40px 30px;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                    max-width: 700px;
                    margin: 50px auto;
                    font-size: 16px;
                    line-height: 1.7;
                    border-left: 6px solid #ff6347; /* Borde izquierdo de color */
                }
                h2 {
                    text-align: left;
                    color: #ff6347;
                    font-size: 28px;
                    margin-bottom: 25px;
                    font-weight: 700;
                    border-bottom: 2px solid #ff6347;
                    padding-bottom: 10px;
                }
                p {
                    margin-bottom: 18px;
                    font-size: 16px;
                    color: #4a4a4a;
                }
                .highlight {
                    color: #ff6347;
                    font-weight: bold;
                }
                .alert {
                    background-color: #ffe4e1;
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid #ff9a8b;
                    margin-top: 30px;
                    font-size: 16px;
                    color: #6a6a6a;
                }
                .alert strong {
                    font-weight: 700;
                    color: #d84b16;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 14px;
                    color: #888;
                    border-top: 1px solid #e0e0e0;
                    padding-top: 15px;
                }
                .footer a {
                    color: #3498db;
                    text-decoration: none;
                    font-weight: 500;
                }
                .signature {
                    margin-top: 30px;
                    font-style: italic;
                    font-size: 16px;
                    color: #555;
                }
                .address {
                    font-size: 14px;
                    color: #999;
                    margin-top: 15px;
                    text-align: center;
                }
                .button {
                    background-color: #ff6347;
                    color: #fff;
                    padding: 12px 18px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    margin-top: 20px;
                    text-align: center;
                }
                .button:hover {
                    background-color: #e5533c;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Notificación de Registro Sospechoso</h2>

                <p>Cordial saludo</p>

                <p>
                    Le informamos que se ha detectado un intento de registro sospechoso en nuestro sistema. En esta ocasión, el usuario
                    <span class="highlight">${user}</span>, identificado con el número de documento <span class="highlight">${numDoc}</span>, ha
                    intentado registrarse en una campaña distinta a la permitida.
                </p>

                <p>
                    Este correo tiene un carácter estrictamente informativo y se envía en cumplimiento de nuestras políticas de seguridad,
                    discreción y protección de datos. Queremos reiterar nuestro compromiso con la integridad de nuestras operaciones y con el
                    resguardo de la información confidencial de nuestros usuarios.
                </p>

                <p>
                    Le recordamos que toda actividad irregular será monitoreada y gestionada conforme a nuestras normas internas y principios de
                    conducta leal. Si considera que este aviso es un error o tiene información adicional, por favor no dude en contactarnos a
                    través de los canales oficiales.
                </p>

                <p>
                    Agradecemos su atención y colaboración.
                </p>
                <div class="footer">
                    <p>Este mensaje ha sido generado automáticamente. Por favor, no responda a este correo.</p>
                </div>
            </div>
        </body>
    </html>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error al enviar el correo: ", error);
    }
  }

  async sendSurveyEmail(to: string, name: string, link: string) {
    const mailOptions = {
      from: 'servicios.portalsarah@futurumprojects.co',
      to,
      subject: 'Ha recibido una nueva encuesta',
      html: `
      <html>
        <body>
          <h1>Hola ${name},</h1>
          <p>Ha recibido una nueva encuesta. Haga clic en el siguiente enlace para diligenciarla:</p>
          <a href="${link}" target="_blank">${link}</a>
        </body>
      </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Correo de encuesta enviado a ${to}: ${info.messageId}`);
    } catch (error) {
      console.error(`Error al enviar el correo de encuesta a ${to}:`);
    }
  }

  async sendMessageEmail(to: string, name: string, subject: string, message: string) {
    const mailOptions = {
      from: 'servicios.portalsarah@futurumprojects.co',
      to,
      subject,
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              padding: 20px;
            }
            .message-container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: auto;
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="message-container">
            <h1>Hola ${name},</h1>
            <p>${message}</p>
          </div>
        </body>
      </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Correo enviado a ${to}: ${info.messageId}`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${to}:`, error);
    }
  }
}