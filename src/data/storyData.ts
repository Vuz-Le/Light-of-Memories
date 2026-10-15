import { DialogueNode } from '../types/gameTypes';

export const DIALOGUE_GROUPS: Record<string, DialogueNode[]> = {
  // Cuội tỉnh dậy dưới gốc đa
  wake_intro: [
    {
      id: 'wake_1',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'surprised',
      text: 'Ưm... Đêm Rằm hôm nay trăng sáng lạ thường, nhưng sao quanh đây lại yên ắng đến thế nhỉ?',
      nextId: 'wake_2',
    },
    {
      id: 'wake_2',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'sad',
      text: 'Bình thường giờ này chị Hằng đã mang trà và bánh nướng ra ghế đá rồi... Chị Hằng ơi, chị đâu rồi?',
      nextId: null,
    },
  ],

  // Ghế đá trống không
  bench_empty: [
    {
      id: 'bench_1',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'sad',
      text: 'Chiếc ghế đá quen thuộc trống không... Không còn hương hoa quế, cũng chẳng thấy bóng dáng chị Hằng đâu.',
      nextId: 'bench_2',
    },
    {
      id: 'bench_2',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'neutral',
      text: 'Kìa, trên lớp bụi xám có những dấu chân lạ lùng và cả vệt bánh xe kim loại... Ai đã tới đây vậy?',
      nextId: 'bench_3',
    },
    {
      id: 'bench_3',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'determined',
      text: 'Mình phải đến hỏi Cây Đa ngàn năm xem chuyện gì đã xảy ra!',
      nextId: null,
      triggerEvent: 'interacted_bench',
    },
  ],

  // Cây Đa truyền nhiệm vụ
  tree_task: [
    {
      id: 'tree_1',
      speaker: 'Cây Đa',
      avatar: 'tree',
      emotion: 'neutral',
      text: 'Cuội ơi... Đừng hoảng sợ, con ngoan. Chị Hằng không đi xa đâu, nhưng Mặt Trăng của chúng ta đã thay đổi rồi.',
      nextId: 'tree_2',
    },
    {
      id: 'tree_2',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'surprised',
      text: 'Mặt Trăng thay đổi sao ạ? Con nhớ mình chỉ vừa ngủ một giấc ngắn...',
      nextId: 'tree_3',
    },
    {
      id: 'tree_3',
      speaker: 'Cây Đa',
      avatar: 'tree',
      emotion: 'neutral',
      text: 'Trong lúc con ngủ say, từ Trái Đất xa xôi, con người đã chế tạo những cỗ máy thám hiểm dũng cảm bay lên đây. Họ đã làm việc cật lực và ở lại khi hết năng lượng.',
      nextId: 'tree_4',
    },
    {
      id: 'tree_4',
      speaker: 'Cây Đa',
      avatar: 'tree',
      emotion: 'happy',
      text: 'Đây là chiếc Đèn Ông Sao năm cánh. Mỗi người bạn con tìm thấy và sẻ chia câu chuyện sẽ thắp sáng một cánh sao. Khi cả năm cánh sao rực rỡ, ánh trăng sẽ chỉ lối con gặp lại chị Hằng!',
      nextId: 'tree_5',
      triggerEvent: 'give_lantern',
    },
    {
      id: 'tree_5',
      speaker: 'Cây Đa',
      avatar: 'tree',
      emotion: 'neutral',
      text: 'Ta trao cho con cuốn Sách Đồng Hành này. Hãy mở sách đọc để tìm kiếm những manh mối quý giá. Nhìn xem, phía bên phải có một vệt bụi dẫn đến một miệng hố thiên thạch... Hãy bắt đầu từ đó!',
      nextId: null,
      triggerEvent: 'tree_finished',
    },
  ],

  // Gặp Mắt Tròn ở miệng hố
  crater_meet: [
    {
      id: 'mtron_1',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'happy',
      text: 'Tít... rè... Tách! Xin chào người bạn nhỏ! Đã nhiều năm trôi qua rồi mới lại có bước chân ghé thăm mình trong lòng miệng hố này.',
      nextId: 'mtron_2',
    },
    {
      id: 'mtron_2',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'surprised',
      text: 'Chào bạn! Mình là Cuội. Bạn có ba chiếc chân thật vững chãi và một "con mắt" to tròn hướng lên bầu trời. Bạn là ai vậy?',
      nextId: 'mtron_3',
    },
    {
      id: 'mtron_3',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'happy',
      text: 'Mọi người ở NASA gọi mình là Surveyor 3. Mình đổ bộ lên Mặt Trăng từ năm 1967. Nhưng bạn hãy gọi mình là Mắt Tròn nhé, nghe thân thương lắm!',
      nextId: 'mtron_4',
    },
    {
      id: 'mtron_4',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'neutral',
      text: 'Mình từng đào xới đất và chụp hàng ngàn bức ảnh gửi về Trái Đất. Nhưng bụi vũ trụ qua năm tháng đã làm vương vãi các trang nhật ký ký ức của mình...',
      nextId: 'mtron_5',
    },
    {
      id: 'mtron_5',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'happy',
      text: 'Cuội ơi, bạn có thể giúp mình tìm 3 mảnh nhật ký quanh miệng hố này và sắp xếp chúng lại theo đúng thời gian không? Cuốn Sách Đồng Hành của bạn có chứa manh mối đấy!',
      nextId: 'mtron_6',
    },
    {
      id: 'mtron_6',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'determined',
      text: 'Chắc chắn rồi Mắt Tròn! Mình sẽ đi quanh miệng hố tìm 3 mảnh nhật ký ngay!',
      nextId: null,
      triggerEvent: 'start_search_fragments',
    },
  ],

  // Khi bấm vào Mắt Tròn mà chưa đủ 3 mảnh
  crater_not_enough: [
    {
      id: 'not_enough_1',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'neutral',
      text: 'Cuội hãy tìm đủ 3 mảnh ký ức quanh miệng hố này nhé. Chúng đang phát ra ánh sáng lấp lánh trên nền đất xám đấy!',
      nextId: null,
    },
  ],

  // Hoàn thành xếp nhật ký và thắp cánh sao đầu tiên
  chapter1_finish: [
    {
      id: 'c1_fin_1',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'happy',
      text: 'Ôi, tuyệt vời quá Cuội ơi! Bạn đã sắp xếp các sự kiện chính xác từng mốc thời gian: Ngày hạ cánh 1967, chụp ảnh thám hiểm, và chuyến thăm của các phi hành gia Apollo 12 năm 1969!',
      nextId: 'c1_fin_2',
    },
    {
      id: 'c1_fin_2',
      speaker: 'Cuội',
      avatar: 'cuoi',
      emotion: 'happy',
      text: 'Mắt Tròn ơi, bạn đã làm được những điều thật phi thường. Chúng mình sẽ không bao giờ quên tên và câu chuyện của bạn!',
      nextId: 'c1_fin_3',
    },
    {
      id: 'c1_fin_3',
      speaker: 'Mắt Tròn',
      avatar: 'mat_tron',
      emotion: 'happy',
      text: '"Xin đừng quên tên mình" - Cảm ơn Cuội vì đã nhớ đến mình!',
      nextId: 'c1_fin_4',
    },
    {
      id: 'c1_fin_4',
      speaker: 'Cây Đa',
      avatar: 'tree',
      emotion: 'happy',
      text: 'Keng... Tinh tú vẫy gọi! Lòng chân thành và tri thức khoa học đã đánh thức cánh sao đầu tiên! Chiếc Đèn Ông Sao của Cuội đã bắt đầu bừng sáng!',
      nextId: null,
      triggerEvent: 'star_first_lit',
    },
  ],
};
