export const SITE = {
  name: 'Hair 2 Hair Studio',
  tagline: 'Beauty Meets Comfort',
  phoneDisplay: '+91 81219 99243',
  phoneHref: 'tel:+918121999243',
  email: 'hair2hairstidio2024@gmail.com',
  reviewsUrl: 'https://share.google/r8DPpoClZQkq3dS7W',
  social: {
    instagram: 'https://www.instagram.com/h2h_hairstudio_/?__pwa=1',
    facebook: 'https://www.facebook.com/share/1BoX9WysMB/',
    youtube: 'https://youtube.com/source/DNoNgL8tSsY/shorts?si=c4ej8ETEsCjXOADc',
  },
};

export const BRANCHES = [
  {
    name: 'Dilsukhnagar, Hyderabad',
    note: 'Main studio',
    hours: 'Every day, 7:00 AM–7:00 PM',
    address: 'Shop No. 90, 1st Floor, beside Sai Baba Temple, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060',
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Hair 2 Hair Studio, Shop No. 90, 1st Floor, beside Sai Baba Temple, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060'),
    embedUrl:
      'https://www.google.com/maps?output=embed&q=' +
      encodeURIComponent('Shop No. 90, 1st Floor, beside Sai Baba Temple, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060'),
  },
  {
    name: 'Khammam',
    note: 'Branch',
    hours: 'Contact the studio to confirm current hours',
    address: '2nd floor, Star complex, Near new bus stand, Khammam, Telangana 507002',
    mapsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Star complex, Near new bus stand, Khammam, Telangana 507002'),
    embedUrl: '',
  },
];

export function whatsappUrl(message = 'Hi! I would like to know more about your hair solutions.') {
  return `https://wa.me/918121999243?text=${encodeURIComponent(message)}`;
}
