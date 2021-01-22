var todo = new Vue ({
    el: '#exam',
    data: {
        enterText: '',
        tasks: [],
        isDisabled: true,
    },
    methods: {
        addTask: function() {
            this.tasks.push({
                name: this.enterText,
                isReady: false,
                isEditable: false,
                isDeleted: false,
            });
            this.enterText = '';
        },
        dltAllCheckedTasks: function() {
            let checkedTasks = [];
            this.tasks.forEach(item => {
                if (item.isReady) {
                    checkedTasks.push({
                        ...item, isDeleted: true
                    })
                } else {
                    checkedTasks.push(item)
                }
            })
            this.tasks = checkedTasks;
        }
    },
    watch: {
        enterText: function(val) {
            const l = val.length;
            this.isDisabled = (l === 0);
        },
        tasks: function(newTasks) {
            window.localStorage.setItem('tasks', JSON.stringify(newTasks));
        }
    },
    computed: {
        readyTasks: function() {
            let count = 0;
            this.tasks.filter(item => !item.isDeleted).forEach(item => {
                if (item.isReady) {
                    count += 1;
                }
            });
            return count;
        },
        totalTasks: function() {
            return this.tasks.filter(item => !item.isDeleted).length;
        },
    },
    beforeMount: function() {
        const getData = JSON.parse(window.localStorage.getItem('tasks'));
        if (getData) {
            this.tasks = getData;
        } 
    }
})

//Calendar
function Calendar2(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
    if (DNfirst != 0) {
      for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
      for(var  i = 0; i < 6; i++) calendar += '<td>';
    }
    for(var  i = 1; i <= Dlast; i++) {
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today">' + i;
      }else{
        calendar += '<td>' + i;
      }
      if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
        calendar += '<tr>';
      }
    }
    for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
    }
    Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
    // переключатель минус месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
      Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
    }
    // переключатель плюс месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
      Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
    }

//Часы
window.onload = function(){
    window.setInterval(function(){        
        var now = new Date();
        var clock = document.getElementById("clock");
        clock.innerHTML = now.toLocaleTimeString();
    }, 1000);
};

function clock() {
    var d = new Date();
    var month_num = d.getMonth()
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var year = d.getFullYear();
    
    month =     new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    
    if (day <= 9) day = "0" + day;
    //if (hours <= 9) hours = "0" + hours;
    //if (minutes <= 9) minutes = "0" + minutes;
    //if (seconds <= 9) seconds = "0" + seconds;
    
    date_time = day + " " + month[month_num] + " " + year;
    if (document.layers) {
     document.layers.doc_time.document.write(date_time);
     document.layers.doc_time.document.close();
    }
    else document.getElementById("doc_time").innerHTML = date_time;
     setTimeout("clock()", 1000);
}
clock();
