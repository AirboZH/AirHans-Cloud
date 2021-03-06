import { getDOM } from './getDOM.js'
import { listTurn } from './onlineList.js';
import { resizeBubble } from './resize.js';
import { dataMy, dbAdd, dbRead } from './save.js';
import { startTime } from './time.js';
/**
 * 返回新的消息气泡对象
 * @returns jQuery对象
 * @author Hans
 */
const TemplateHere = () => {
    return $(`<div class="d-flex flex-row-reverse align-items-center mb-1">
                    <div class="chatBox--output--avator__normal">

                    </div>
                    <div class="chatBox--output--bubble">
                        <div class="card">
                            <div class="card-header container p-0 text-right" style="height:1.5rem">

                                <span id="chatBox--output--id">id</span>
                                <span id="chatBOx--output--time">time</span>
                                <div class="chatBox--output--arrow__right border-bottom-0 border-left-0"></div>
                            </div>
                            <div class="card-body p-1">
                                <div class="chatBox--output--message" class="m-0 d-inline"></div>
                            </div>
                        </div>
                    </div>
                </div>`);
}

const TemplateThere= () => {
    return $(`<div class="d-flex align-items-center mb-1">
                    <div class="chatBox--output--avator__normal">

                    </div>
                    <div class="chatBox--output--bubble">
                        <div class="card">
                            <div class="card-header container p-0" style="height:1.5rem">
                                <div class="chatBox--output--arrow__left border-top-0 border-right-0"></div>
                                <span id="chatBox--output--id">id</span>
                                <span id="chatBOx--output--time">time</span>
                            </div>
                            <div class="card-body p-1">
                                <div class="chatBox--output--message" class="m-0 d-inline"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>`);
}


/**
 * 在聊天界面输出框中添加消息气泡
 * @param {string} text 
 * @param {string} id 
 * @param {boolean} isThere 
 * @author Hans
 */
const bubble = (data) => {
    let text = data.text;
    let id = data.id;
    let time = data.time;
    // TODO 判断日期，消息之间增加分割线

    if (isThere(data.id)) {
        var bubbleTemp = TemplateThere();
    } else {
        var bubbleTemp = TemplateHere();
    }


    bubbleTemp.find(".chatBox--output--message").text(text);
    bubbleTemp.find("#chatBox--output--id").text(id);
    bubbleTemp.find("#chatBOx--output--time").text(time);
    //聊天界面里头像为ID首字母
    bubbleTemp.find(".chatBox--output--avator__normal").text(id[0]);
    
    
    let tempWidth = bubbleTemp.find("#chatBox--outptu--bubble").width();

    
    bubbleTemp.appendTo("#chatBox--output");
    resizeBubble();

    //TODO动画返回output底部
    $("#chatBox--output").scrollTop(getDOM("output").scrollHeight);
    
    
}

const clearBubble = () => {
    let backup = $("#chatBox--output--template").parent().detach();
    $("#chatBox--output").empty().append(backup);
}

const isThere = (id) => {
    if (id == dataMy.id) {
        return false;
    } else {
        return true;
    }
}

const loadBubble = (data) => {
    // console.log(data);
    for (const element of data) {
    // for (let i = 0;i < data.length;i++) {
        bubble(element);
    }
    
}

export { bubble, clearBubble, loadBubble }