export class AboutUs {
  constructor({ aboutId, logo, photo, content, contact, createdAt, updatedAt }) {
    this.aboutId = aboutId;
    this.logo = logo;
    this.photo = photo;
    this.content = Array.isArray(content) ? content : JSON.parse(content || '[]');
    this.contact = contact;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
