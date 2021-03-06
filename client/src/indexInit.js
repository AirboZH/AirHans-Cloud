import { toast } from './toast.js'

//登录部分开始
$(".loginForm").on("submit",(e) => {
    e.preventDefault();
    TemplateSpinner.addClass("spinner--inButton__show").prependTo($(e.target).find("[type='submit']"));
    let tempForm = new FormData($(".loginForm")[0]);
    let sendMsg = ({
        "email": tempForm.get("email"),
        "password": tempForm.get("password")
    });
    // $.post("http://127.0.0.1:8081", sendMsg,
    $.post("http://127.0.0.1:8081", sendMsg,
        function (data, textStatus, jqXHR) {
            if(data.status === 1){
                toast("系统","登录成功！");
                let url = "./demo-chat.html";
                window.localStorage.setItem("token",data.token);
                window.localStorage.setItem("id",data.id);
                window.localStorage.setItem("email",data.email);
                window.location.replace(url);
            }
            else{
                toast("系统", "登录失败");
                TemplateSpinner.remove();
            }
        }
    );
});
//登录部分结束
//注册部分开始
$(".signUpForm").on("submit",(e) => {
    e.preventDefault();
    TemplateSpinner.addClass("spinner--inButton__show").prependTo($(e.target).find("[type='submit']"));
    let tempForm = new FormData($(".signUpForm")[0]);

    if ( tempForm.get("password") !== tempForm.get("passwordAgain") ) {
        alert("密码不一致！");
        return;
    } else {
        let sendMsg = JSON.stringify({
            "email": tempForm.get("email"),
            "captcha": tempForm.get("captcha"),
            "account": tempForm.get("account"),
            "password": tempForm.get("password")
        });
        // $.post("http://127.0.0.1:5555", sendMsg,
        $.post("http://127.0.0.1:5555", sendMsg,

        
        function (data, textStatus, jqXHR) {
            console.log(data);
            toast("系统","注册成功！");
            setTimeout(() => {
                location.reload()
            }, 3000);
            
        }
        );
    }
    
});
//注册部分结束

//邮箱验证部分
$(".button--captcha").on("click",(e) => {
    let tempForm = new FormData($(".signUpForm")[0]);
    e.preventDefault();
    
    
    let sendMsg =JSON.stringify({
        "email": tempForm.get("email")
    });
    banCaptcha();
    // $.post("http://127.0.0.1:7777", sendMsg,
    $.post("http://127.0.0.1:7777", sendMsg,

        function (data, textStatus, jqXHR) {
            console.log(data);
        }
    );

})
$(".link--signUp").on("click",(e) => {
    e.preventDefault();
    console.log("移动");
    $(".signUpBox").addClass("signUpBox__show");
    $(".loginBox").addClass("loginBox__hidden");


});

$(".link--login").on("click", () => {
    $(".signUpBox").removeClass("signUpBox__show");
    $(".loginBox").removeClass("loginBox__hidden");


});

const TemplateSpinner = $(`<div class="spinner-border spinner--inButton" role="status">
											<span class="sr-only">加载中Loading...</span>
										</div>`)


const moveOutFormBox = () => {
    $(".formBox").appendTo("body");

}
const moveInFormBox = () => {
    $(".indexBox--right").find(".d-flex").append($(".formBox"));

}
window.onresize = () => {
    if (window.innerWidth < 576) {
        moveOutFormBox();
    } else {
        moveInFormBox();
    }

}

const arrayWords = ["chat","explore"];
const keyInWord = (word) => {
    let tempWord = "";
    let i = 0;
    let interval = setInterval(() => {
        tempWord += word[i++];
        $(".wordBox").text(tempWord);
        if (i >= word.length) {
            clearInterval(interval);
            i = 0;
        }
    }, 100);
}

const selectWord = () => {
    //标题键入动效
    let i = 0;

    setInterval(() => {

        keyInWord(arrayWords[i++]); 
        if (i >= arrayWords.length) {
            i = 0;
        }
    }, 2000);
}

/**
 * 验证码冷却1min
 */
const banCaptcha = () => {
    let i = 60;
    $(".button--captcha").val(`${i--}稍后再试`).attr("disabled","true");
    let tempInterval = setInterval(() => {
        $(".button--captcha").val(`${i--}稍后再试`);
        if (i < 0) {
            clearInterval(tempInterval);
            $(".button--captcha").val(`发送验证码`).removeAttr("disabled");

        }
    }, 1000);
}

selectWord();

// //cookie测试
// document.cookie = encodeURIComponent("token") + "=" + encodeURIComponent("fortest123") + "; path=/";
// document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Hans") + "; domain=127.0.0.1; path=/";

// /**
//  * 红皮书
//  * @param {String} name --cookieName 
//  * @returns value -- cookieValue
//  */
// const readCookie = (name) => {
//     let cookieName = `${encodeURIComponent(name)}=`,
//         cookieStart = document.cookie.indexOf(name),
//         cookieValue;
//     if (cookieStart > -1) {
//         //"name" 存在
//         let cookieEnd = document.cookie.indexOf(";", cookieStart);
//         if (cookieEnd == -1) {
//             //";"存在
//             cookieEnd = document.cookie.length;
//         }
//         cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
//         //substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
//     }

//     return cookieValue;
// }
// console.log(readCookie("token"));
// console.log(document.cookie);

/* 
    屏幕正上方
    Welcome Hans   先后出场顺序
    Welcome Back Hans （之后有cookie的）
    请输入您的Id^^^^，Welcome Hans
    转场动画

*/