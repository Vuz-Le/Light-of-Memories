import { CharacterCard } from '../types/gameTypes';

export const CHARACTER_CARDS: Record<string, CharacterCard> = {
  'mat-tron': {
    id: 'mat-tron',
    name: 'Mắt Tròn',
    codename: 'Surveyor 3 (NASA)',
    year: '1967 – 1969',
    role: 'Tàu đổ bộ tiền trạm kiểm tra độ cứng bề mặt Mặt Trăng',
    avatar: 'mat_tron',
    storyDescription: 'Mắt Tròn là chú robot ba chân hiền lành, trung kiên. Chú đứng lặng yên trong lòng miệng hố với một chiếc camera tròn hướng lên vòm trời đầy sao. Chú đã chụp hơn 6.300 bức ảnh và đào các rãnh đất để con người biết rằng Mặt Trăng không hề nuốt chửng những bước chân.',
    nasaFacts: [
      'Đổ bộ thành công ngày 20/04/1967 tại Oceanus Procellarum (Đại Dương Bão).',
      'Đã truyền về Trái Đất 6.315 tấm ảnh truyền hình với góc quay 360 độ cực kỳ sắc nét.',
      'Sử dụng cánh tay cơ học Soil Mechanics Surface Sampler đào 4 rãnh sâu tới 17.5 cm.',
      'Ngày 19/11/1969, hai phi hành gia Apollo 12 đã đi bộ đến thăm Surveyor 3 và mang chiếc camera về Trái Đất để nghiên cứu sau 31 tháng phơi mình ngoài vũ trụ.',
      'Hiện camera của Surveyor 3 đang được trưng bày tại Bảo tàng Quốc gia Smithsonian.'
    ],
    stemSkill: 'Mắt Phóng To (Zoom Eye): Khả năng quan sát tinh tường, phóng to chi tiết nhỏ trên bề mặt các vật thể không gian.'
  }
};
