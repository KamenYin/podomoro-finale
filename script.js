$(document).ready(function (){
    let breakCtr = 5;
    let sessionCtr = 25;
    let tmp = `${sessionCtr}:00`;
    let isPlay = false;
    let dispVal;
    let dispValMin = sessionCtr;
    let dispValSec = 0;
    let stopMe = 0;
    let isBreak = false;
    const formatMe = (min, sec) => {
        const minFormat = String(min).padStart(2, '0');
        const secFormat = String(sec).padStart(2, '0');
        return `${minFormat}:${secFormat}`;
    }
    const renderMe = () => {
        $('#time-left').text(formatMe(dispValMin, dispValSec));

    }

    const buttUp = () => {
        const contButts = document.querySelectorAll('.butt-control')

        contButts.forEach(function(butt){
            if(isPlay){
                butt.querySelector('i').classList.add('fa-spin');
            }else {
                butt.querySelector('i').classList.remove('fa-spin');
            }
        });
    }

    buttUp();


    $('#break-length').text(breakCtr);
    $('#session-length').text(sessionCtr);
    $('#time-left').text(tmp);
    $('#break-increment').click(function(){
        if(breakCtr < 60 ){
            breakCtr++;
            $('#break-length').text(breakCtr);
        } 

    })

    $('#break-decrement').click(function(){
        if(isPlay === false){
        if(breakCtr > 1){
            breakCtr--;
            $('#break-length').text(breakCtr);
            }
        }

    })

    $("#session-increment").click(function(){
        if(isPlay === false){
            if(sessionCtr < 60){
                sessionCtr++;
                $('#session-length').text(sessionCtr);
            }
            tmp = `${sessionCtr}:00`;
            $('#time-left').text(tmp);


        }



    })

    $("#session-decrement").click(function(){
        if(isPlay === false){
            if(sessionCtr > 1){
                sessionCtr--;
                $('#session-length').text(sessionCtr);
            }

            tmp = `${sessionCtr}:00`;
            $('#time-left').text(tmp);
        }


    })
    const updateTimer = () => {
        if (isBreak === false){
            if (dispValMin >= 1 && dispValSec === 0){
                dispValSec = 59;
                dispValMin--;
              }else if (dispValMin >= 0  && dispValSec !== 0){
                        dispValSec--;           
              } else if (dispValMin === 0 && dispValSec === 0){
                        isBreak = true;
                        dispValMin = breakCtr;
                        dispValSec = 0;
                        $('#timer-label').text('Break');
                        document.getElementById('beep').play();
              }
              renderMe();

        } else if (isBreak === true){
                if (dispValMin >= 1 && dispValSec === 0){
                    dispValSec = 59;
                    dispValMin--;
                }else if (dispValMin >= 0  && dispValSec !== 0){
                            dispValSec--;
                } else if (dispValMin === 0 && dispValSec === 0){
                            isBreak = false;
                            dispValMin = sessionCtr;
                            dispValSec = 0;
                            $('#timer-label').text('Session');
                            document.getElementById('beep').play();
                            $('#time-left').text(`${dispValMin}:${dispValSec}`);
                  }
                renderMe();
        }       
}

        $('#start_stop').click(function(){
             dispVal = $('#time-left').text().split(":");
             dispValMin =  parseInt(dispVal[0]);
             dispValSec =  parseInt(dispVal[1]);

           if(isPlay === false){
            isPlay = true;

             stopMe =   setInterval(updateTimer, 1000);
           }else if(isPlay === true){
                isPlay = false;

                clearInterval(stopMe);
           }
           buttUp();
        })

        $('#reset').click(function(){
            breakCtr = 5;
            sessionCtr = 25;    
            $('#break-length').text(breakCtr);
            $('#session-length').text(sessionCtr);
            tmp = formatMe(sessionCtr, 0);
            $(`#time-left`).text(tmp);
            $('#timer-label').text('Session');
            dispValMin = sessionCtr;
            dispValSec = 0;
            clearInterval(stopMe);
            isPlay = false;
            isBreak = false;
            let audio = document.getElementById('beep');
            audio.pause();
            audio.currentTime = 0;
            buttUp();
        });
})  