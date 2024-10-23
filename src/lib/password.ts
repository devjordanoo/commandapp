import bcrypt from 'bcrypt';

export class PasswordHelper {
  private static _saltRounds = 10; 

  static async generateSalt() {
    return await bcrypt.genSalt(this._saltRounds);
  }

  static async hashPassword(password: string) {
    const salt = await this.generateSalt();
    return await bcrypt.hash(password, salt);
  }

  static async verifyPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
