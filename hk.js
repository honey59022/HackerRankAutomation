const puppeteer=require("puppeteer");
const codeObj=require("./codes");



console.log("before");
let browserOpenPromise=puppeteer.launch({headless:false,defaultViewport:null,args:["--start-maximized"]});


const loginUrl="https://www.hackerrank.com/auth/login";
const email="wakot86820@tebyy.com";
const passWord="ABcd@123";



let page;
browserOpenPromise.then(function(browser){
    let newPagePromise=browser.newPage();

    return newPagePromise;
})
.then(function(newTab){
    page=newTab;

    let hackerRankOpenPromise=newTab.goto(loginUrl);

    return hackerRankOpenPromise;
})
.then(function(){
    let emailElementWaitPromise=page.waitForSelector("input[type=text]",{visible:true});

    return emailElementWaitPromise;
})
.then(function(){
    let emailEnteredPromise=page.type("input[type=text]",email);

    return emailEnteredPromise;
})
.then(function(){
    let passwordElementWaitPromise=page.waitForSelector("input[type=password]",{visible:true});

    return passwordElementWaitPromise;
})
.then(function(){
    let passWordEnteredPromise=page.type("input[type=password]",passWord);

    return passWordEnteredPromise;
})
.then(function(){
    let loginElementWaitPromise=page.waitForSelector(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",{visible:true});

    return loginElementWaitPromise;
})
.then(function(){
    let loginButtonPressedPromise=page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");

    return loginButtonPressedPromise;
})
.then(function(){
    return page.waitForTimeout(3000);
})
.then(function(){
    let clickOnAlgoPromise=waitAndClick(".topic-card a[data-attr1=algorithms]",page);
    
    return clickOnAlgoPromise;
})
.then(function(){
    return page.waitForTimeout(3000);
})
.then(function(){
    let clickOnWarmUpPromise=waitAndClick(".checkbox-wrap input[value=warmup]",page);

    return clickOnWarmUpPromise;
})
.then(function(){
    let waitFor5SecondsPromise=page.waitForTimeout(5000);

    return waitFor5SecondsPromise;
})
.then(function(){
    //this $$ is a shorthand syntax for document.querySelectorAll(); 
    let allProblemArrPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");

    return allProblemArrPromise;
})
.then(function(questionArr){
    let questionsWillBeSolvedPromise=questionSolver(page,questionArr[0],codeObj[0]);
    
    console.log(questionArr.length);
    return questionsWillBeSolvedPromise;
})
.catch(function(err){
    console.log(err);
});


console.log("after");











/* 
    Important promise chaning ->
    
    Take Help From - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

*/

function waitAndClick(selector,cpage){

    let promies=new Promise(function(resolve,reject){
        
        cpage.waitForSelector(selector,{visible:true})
        .then(function(){
            let clickPromise=cpage.click(selector);
            return clickPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject();
        })
    });


    return promies;
}














/* 
    Important Section of Question Solving 
    Here we go to each question and solved it
*/


function questionSolver(page,question,answer){
    
    return new Promise(function(resolve,reject){
        let questionWillBeClickedPromise=question.click();


        questionWillBeClickedPromise
        .then(function(){
            return page.waitForTimeout(10000);
        })
        .then(function(){
            let textAreaInFocusPromise=waitAndClick(".checkbox-input",page);

            return textAreaInFocusPromise;
        })
        .then(function(){
            return page.waitForSelector("textarea.custominput",page);
        })
        .then(function(){
            return page.type("textarea.custominput",answer);
        })
        .then(function(){
            let CtrlIsPressedPromise=page.keyboard.down("Control",{delay:100});
            return CtrlIsPressedPromise;
        })
        .then(function(){
            let AIsPressedPromise=page.keyboard.press("A",{delay:100});
            return AIsPressedPromise;
        })
        .then(function(){
            let XIsPressedPromise=page.keyboard.press("X",{delay:100});
            return XIsPressedPromise;
        })
        .then(function(){
            let CtrlIsUnPressedPromise=page.keyboard.up("Control");
            return CtrlIsUnPressedPromise;
        })
        .then(function(){
            let mainEditorInFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return mainEditorInFocus;
        })
        .then(function(){
            let CtrlIsPressedPromise=page.keyboard.down("Control");
            return CtrlIsPressedPromise;
        })
        .then(function(){
            let AIsPressedPromise=page.keyboard.press("A",{delay:100});
            return AIsPressedPromise;
        })
        .then(function(){
            let VIsPressedPromise=page.keyboard.press("V",{delay:100});
            return VIsPressedPromise;
        })
        .then(function(){
            let CtrlIsUnPressedPromise=page.keyboard.up("Control");
            return CtrlIsUnPressedPromise;
        })
        .then(function(){
            let submitButtonIsPressed=page.click(".hr-monaco-submit",{delay:10});
            return submitButtonIsPressed;
        })
        .then(function(){
            resolve();
        })
        .catch(function(){
            reject();
        })

        
    });

}