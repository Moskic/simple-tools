const translations = {
    zh: {
        pageTitle: 'WIDE Evo 打印画质解锁 | moskic.com',
        switchText: 'EN',
        title: 'WIDE Evo 打印画质解锁',
        intro: '在浏览器本地将照片处理为 2560 × 1920 JPEG，并写入 WIDE Evo 认可的文件格式与来源校验信息，使其可从 TF 卡直接打印，绕过手机传图压缩，解锁约提升一倍分辨率的隐藏打印画质；全程在本地处理，没有任何数据将会被上传。',
        uploadPrompt: '拖拽照片到这里，或点击选择文件',
        uploadHint: '支持 JPG、PNG、WebP 等格式',
        prefixLabel: '输出文件名前缀',
        startIndexLabel: '起始编号',
        processAll: '处理所有照片',
        processingAll: '处理中...',
        clearList: '清空列表',
        pending: '等待处理',
        processing: '处理中...',
        done: '完成',
        error: '失败',
        resultsTitle: '处理完成',
        originalFile: '原文件',
        download: '下载',
        downloadAll: '下载全部',
        jpegError: 'JPEG 编码失败',
        thanksTitle: '致谢与改进',
        thanksBefore: '感谢',
        thanksAfter: ' 提供的原版工具。本版本修复了文件名脚本注入、批量处理内存占用、临时图片 URL 泄漏和重复处理问题，并统一了 Simple Tools 的界面风格。'
    },
    en: {
        pageTitle: 'WIDE Evo Print Quality Unlock | moskic.com',
        switchText: '中文',
        title: 'WIDE Evo Print Quality Unlock',
        intro: 'Locally converts photos to 2560 × 1920 JPEG and writes the file format and source-verification metadata accepted by WIDE Evo, enabling direct TF card printing that bypasses phone-transfer compression and unlocks roughly twice the hidden print resolution; all processing happens locally and no data is uploaded.',
        uploadPrompt: 'Drop photos here, or click to choose files',
        uploadHint: 'Supports JPG, PNG, WebP, and other image formats',
        prefixLabel: 'Output filename prefix',
        startIndexLabel: 'Starting number',
        processAll: 'Process all photos',
        processingAll: 'Processing...',
        clearList: 'Clear list',
        pending: 'Pending',
        processing: 'Processing...',
        done: 'Done',
        error: 'Failed',
        resultsTitle: 'Processing complete',
        originalFile: 'Original',
        download: 'Download',
        downloadAll: 'Download all',
        jpegError: 'JPEG encoding failed',
        thanksTitle: 'Acknowledgements and improvements',
        thanksBefore: 'Thanks to',
        thanksAfter: ' for the original tool. This version fixes filename script injection, high memory usage during batch processing, temporary image URL leaks, and duplicate processing, while adopting the unified Simple Tools interface.'
    }
};

const LANGUAGE_KEY = 'simple-tools-language';

class WideEvo {
    constructor() {
        this.queue = [];
        this.results = [];
        this.processing = false;
        this.currentLang = this.getInitialLanguage();
        
        this.initElements();
        this.bindEvents();
        this.applyLanguage();
        this.updateFooterClock();
        setInterval(() => this.updateFooterClock(), 1000);
    }
    
    initElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.queueEl = document.getElementById('queue');
        this.actionsEl = document.getElementById('actions');
        this.resultsEl = document.getElementById('results');
        this.processBtn = document.getElementById('processBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.prefixInput = document.getElementById('prefix');
        this.startIndexInput = document.getElementById('startIndex');
    }
    
    bindEvents() {
        // 点击上传区域
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        
        // 文件选择
        this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        
        // 拖拽事件
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
        
        // 处理按钮
        this.processBtn.addEventListener('click', () => this.processAll());
        this.clearBtn.addEventListener('click', () => this.clearQueue());
    }

    getInitialLanguage() {
        const saved = localStorage.getItem(LANGUAGE_KEY);
        if (saved === 'zh' || saved === 'en') return saved;
        return (navigator.language || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }

    t(key) {
        return translations[this.currentLang][key] || key;
    }

    applyLanguage() {
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
        document.title = this.t('pageTitle');
        document.getElementById('langSwitch').textContent = this.t('switchText');
        document.querySelectorAll('[data-i18n]').forEach(element => {
            element.textContent = this.t(element.dataset.i18n);
        });
        this.processBtn.textContent = this.t(this.processing ? 'processingAll' : 'processAll');
        this.renderQueue();
        this.renderResults();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem(LANGUAGE_KEY, this.currentLang);
        this.applyLanguage();
    }

    updateFooterClock() {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('footerYear').textContent = now.getFullYear();
        document.getElementById('footerTime').textContent = formatter.format(now);
        document.getElementById('footerTime').setAttribute('datetime', now.toISOString());
    }
    
    handleFiles(files) {
        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;
            
            const item = {
                id: Date.now() + Math.random(),
                file,
                name: file.name,
                status: 'pending',
                preview: URL.createObjectURL(file)
            };
            
            this.queue.push(item);
        }
        
        this.renderQueue();
        this.updateActions();
    }
    
    renderQueue() {
        if (this.queue.length === 0) {
            this.queueEl.innerHTML = '';
            return;
        }
        
        this.queueEl.innerHTML = this.queue.map(item => `
            <div class="queue-item" data-id="${item.id}">
                <img src="${item.preview || ''}" alt="">
                <div class="info">
                    <div class="name">${this.escapeHtml(item.name)}</div>
                    <div class="meta">${this.formatSize(item.file.size)}</div>
                </div>
                <span class="status ${item.status}">${this.getStatusText(item.status)}</span>
                <button class="remove" onclick="app.removeFromQueue(${item.id})" ${this.processing ? 'disabled' : ''}>×</button>
            </div>
        `).join('');
    }
    
    getStatusText(status) {
        return this.t(status);
    }
    
    formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    escapeHtml(value) {
        const element = document.createElement('div');
        element.textContent = String(value);
        return element.innerHTML;
    }
    
    removeFromQueue(id) {
        if (this.processing) return;
        const item = this.queue.find(item => item.id === id);
        if (item) URL.revokeObjectURL(item.preview);
        this.queue = this.queue.filter(item => item.id !== id);
        this.renderQueue();
        this.updateActions();
    }
    
    clearQueue() {
        if (this.processing) return;
        this.queue.forEach(item => URL.revokeObjectURL(item.preview));
        this.results.forEach(result => URL.revokeObjectURL(result.preview));
        this.queue = [];
        this.results = [];
        this.renderQueue();
        this.renderResults();
        this.updateActions();
    }
    
    updateActions() {
        this.actionsEl.style.display = this.queue.length > 0 ? 'flex' : 'none';
    }
    
    async processAll() {
        const itemsToProcess = this.queue.filter(item => item.status === 'pending' || item.status === 'error');
        if (this.processing || itemsToProcess.length === 0) return;
        
        this.processing = true;
        this.processBtn.disabled = true;
        this.clearBtn.disabled = true;
        this.processBtn.textContent = this.t('processingAll');
        
        const prefix = this.prefixInput.value || 'DSCF';
        let index = (parseInt(this.startIndexInput.value) || 1) + this.results.length;
        
        for (const item of itemsToProcess) {
            item.status = 'processing';
            this.renderQueue();
            
            try {
                const result = await this.processImage(item.file, prefix, index);
                item.status = 'done';
                this.results.push({
                    ...result,
                    originalName: item.name
                });
                index++;
            } catch (err) {
                console.error('处理失败:', err);
                item.status = 'error';
            }
            
            this.renderQueue();
        }
        
        this.renderResults();
        this.processing = false;
        this.processBtn.disabled = false;
        this.clearBtn.disabled = false;
        this.processBtn.textContent = this.t('processAll');
        this.renderQueue();
    }
    
    async processImage(file, prefix, index) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const sourceUrl = URL.createObjectURL(file);
            img.onload = async () => {
                URL.revokeObjectURL(sourceUrl);
                try {
                    // 1. 裁剪并缩放
                    const canvas = this.cropAndResize(img);
                    
                    // 2. 转换为带 EXIF 的 JPEG (始终 Orientation=1)
                    const jpegBlob = await this.canvasToJpegWithExif(canvas, 1);
                    
                    // 3. 生成文件名
                    const filename = `${prefix}${String(index).padStart(4, '0')}.JPG`;
                    
                    resolve({
                        blob: jpegBlob,
                        filename,
                        width: canvas.width,
                        height: canvas.height,
                        preview: URL.createObjectURL(jpegBlob)
                    });
                } catch (err) {
                    reject(err);
                }
            };
            img.onerror = (error) => {
                URL.revokeObjectURL(sourceUrl);
                reject(error);
            };
            img.src = sourceUrl;
        });
    }
    
    /**
     * 将图片裁剪并缩放到固定 2560x1920 分辨率
     * 竖拍：先缩放到 1920x2560，再旋转 90° 存储为 2560x1920
     */
    cropAndResize(img) {
        const srcWidth = img.width;
        const srcHeight = img.height;
        const srcRatio = srcWidth / srcHeight;
        
        // 判断原图是否为竖向
        const isPortrait = srcRatio < 1;
        
        // 裁剪比例：横拍 4:3，竖拍 3:4
        const cropRatio = isPortrait ? (3 / 4) : (4 / 3);
        
        let cropWidth, cropHeight, offsetX, offsetY;
        
        if (Math.abs(srcRatio - cropRatio) < 0.01) {
            cropWidth = srcWidth;
            cropHeight = srcHeight;
            offsetX = 0;
            offsetY = 0;
        } else if (srcRatio > cropRatio) {
            cropHeight = srcHeight;
            cropWidth = Math.round(srcHeight * cropRatio);
            offsetX = Math.round((srcWidth - cropWidth) / 2);
            offsetY = 0;
        } else {
            cropWidth = srcWidth;
            cropHeight = Math.round(srcWidth / cropRatio);
            offsetX = 0;
            offsetY = Math.round((srcHeight - cropHeight) / 2);
        }
        
        // 最终输出画布始终为 2560x1920
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = 2560;
        finalCanvas.height = 1920;
        const finalCtx = finalCanvas.getContext('2d');
        
        if (isPortrait) {
            // 竖拍：先生成 1920x2560 的正常竖图，再旋转 90° 存储
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 1920;
            tempCanvas.height = 2560;
            const tempCtx = tempCanvas.getContext('2d');
            
            // 绘制正常竖向图片到临时画布
            tempCtx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, 1920, 2560);
            
            // 将临时画布旋转 90° 绘制到最终画布
            finalCtx.translate(2560, 0);
            finalCtx.rotate(Math.PI / 2);
            finalCtx.drawImage(tempCanvas, 0, 0);
        } else {
            // 横拍：直接绘制到 2560x1920
            finalCtx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, 2560, 1920);
        }
        
        return finalCanvas;
    }
    
    async canvasToJpegWithExif(canvas, orientation = 1) {
        const jpegBlob = await new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (blob) resolve(blob);
                else reject(new Error(this.t('jpegError')));
            }, 'image/jpeg', 0.95);
        });
        const jpegData = await jpegBlob.arrayBuffer();
        
        // 注入 EXIF 数据
        const withExif = this.injectExif(jpegData, orientation);
        
        return new Blob([withExif], { type: 'image/jpeg' });
    }
    
    /**
     * 将 EXIF 数据注入 JPEG 文件
     * 使用从 template.jpg 提取的完整 APP1 段
     * @param {ArrayBuffer} jpegBuffer - JPEG 数据
     * @param {number} orientation - EXIF Orientation 值 (1=正常, 6=需旋转90°)
     */
    injectExif(jpegBuffer, orientation = 1) {
        const jpeg = new Uint8Array(jpegBuffer);
        
        // 验证 JPEG 头
        if (jpeg[0] !== 0xFF || jpeg[1] !== 0xD8) {
            throw new Error('Invalid JPEG');
        }
        
        // 复制 EXIF 数据并修改 Orientation
        const exifData = new Uint8Array(EXIF_APP1_DATA);
        
        // Orientation 标签在 TIFF 数据中的位置
        // EXIF_APP1_DATA 结构: "Exif\0\0" (6字节) + TIFF 头 (8字节) + IFD0
        // IFD0 从偏移 14 开始 (6+8)
        // 在模版中，Orientation 标签 (0x0112) 在 IFD0 的第 3 个条目
        // 每个 IFD 条目 12 字节，前 2 字节是条目数
        // Orientation 条目位置: 14 (Exif头) + 2 (条目数) + 2*12 (前两个条目) = 40
        // Orientation 值在条目的偏移 8 处 (2+2+4 后的 value)
        // 即偏移 40 + 8 = 48
        const orientationOffset = 48;
        exifData[orientationOffset] = orientation;
        
        // 构建完整的 APP1 段 (FFE1 + 长度 + 数据)
        const app1Length = exifData.length + 2; // +2 for length field
        const exifSegment = new Uint8Array(4 + exifData.length);
        exifSegment[0] = 0xFF;
        exifSegment[1] = 0xE1; // APP1 marker
        exifSegment[2] = (app1Length >> 8) & 0xFF; // Length high byte
        exifSegment[3] = app1Length & 0xFF;        // Length low byte
        exifSegment.set(exifData, 4);
        
        // 找到插入位置 (SOI 之后)
        const insertPos = 2;
        
        // 合并数据
        const result = new Uint8Array(jpeg.length + exifSegment.length);
        result.set(jpeg.slice(0, insertPos), 0);
        result.set(exifSegment, insertPos);
        result.set(jpeg.slice(insertPos), insertPos + exifSegment.length);
        
        return result.buffer;
    }
    
    renderResults() {
        if (this.results.length === 0) {
            this.resultsEl.innerHTML = '';
            return;
        }
        
        this.resultsEl.innerHTML = `
            <h3>${this.t('resultsTitle')}</h3>
            ${this.results.map((result, index) => `
                <div class="result-item">
                    <img src="${result.preview}" alt="">
                    <div class="info">
                        <div class="name">${this.escapeHtml(result.filename)}</div>
                        <div class="meta">${result.width} × ${result.height} | ${this.t('originalFile')}: ${this.escapeHtml(result.originalName)}</div>
                    </div>
                    <button class="download" onclick="app.download(${index})">${this.t('download')}</button>
                </div>
            `).join('')}
            <div style="margin-top: 16px; text-align: center;">
<button class="btn primary" onclick="app.downloadAll()">${this.t('downloadAll')}</button>
            </div>
        `;
    }
    
    download(index) {
        const result = this.results[index];
        const url = URL.createObjectURL(result.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
    }
    
    async downloadAll() {
        const zip = new JSZip();
        
        // 添加所有图片到 ZIP
        for (const result of this.results) {
            zip.file(result.filename, result.blob);
        }
        
        // 生成并下载 ZIP
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'WideEvo_Photos.zip';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 0);
    }
}

// 初始化应用
const app = new WideEvo();
