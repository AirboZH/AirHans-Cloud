import { sendMsg } from './websocket.js'
import { getDOM } from './getDOM.js'

/**
 * 对键盘输入事件的响应
 * @author Hans
 */
const initKeyboard = ()=> {
    $(document).keydown((event) => {
        //console.log(event.keyCode);
        if (event.keyCode == 13 && event.shiftKey) {
           // console.log("shift+enter");
        } else
        if (event.keyCode == 13) {
            event.preventDefault();
            //console.log("enter");
            if (getDOM("typing").value !== "") {
                sendMsg(getDOM("id").value,getDOM("typing").value);
            }
        }
    
    });
}


export { initKeyboard }