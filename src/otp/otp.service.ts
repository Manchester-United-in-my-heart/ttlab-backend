import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';
import { authenticator } from 'otplib';

@Injectable()
export class OtpService {
  async generateUniqueSecret() {
    return authenticator.generateSecret();
  }

  async generateOTPToken(username, serviceName, secret) {
    return authenticator.keyuri(username, serviceName, secret);
  }

  async verifyOTPToken(token, secret) {
    return authenticator.verify({ token, secret });
  }

  async generateQRCode(otpAuth) {
    try {
      const QRCodeImageURL = await qrcode.toDataURL(otpAuth);
      // return QRCodeImageURL;
      return `<img src='${QRCodeImageURL}' alt='qr-code-img' />`;
    } catch (e) {
      console.log('Error while generating QR Code');
    }
  }
}
