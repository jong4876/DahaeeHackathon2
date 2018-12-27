$(function () {
    // Make the dashboard widgets sortable Using jquery UI
    $('.connectedSortable').sortable({
      placeholder         : 'sort-highlight',
      connectWith         : '.connectedSortable',
      handle              : '.nav-tabs',
      forcePlaceholderSize: true,
      zIndex              : 999999
    });
    $('.connectedSortable .nav-tabs-custom').css('cursor', 'move');
  });    