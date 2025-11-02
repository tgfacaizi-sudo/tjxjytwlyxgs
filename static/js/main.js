// 移动端菜单切换功能
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 主轮播图控制 - 实现真正的无缝滚动
    const mainCarousel = document.getElementById('mainCarousel');
    if (mainCarousel) {
        const slides = mainCarousel.querySelectorAll('.carousel-item');
        if (slides.length > 0) {
            // 保存真实幻灯片数量
            const realSlideCount = slides.length;
            
            // 设置轮播容器样式
            mainCarousel.style.display = 'flex';
            
            // 确保父容器设置为overflow: hidden
            const carouselContainer = mainCarousel.parentElement;
            if (carouselContainer) {
                carouselContainer.style.overflow = 'hidden';
                carouselContainer.style.position = 'relative';
            }
            
            // 设置幻灯片样式
            slides.forEach(slide => {
                slide.style.minWidth = '100%';
                slide.style.width = '100%';
                // 确保图片完全填充容器
                const img = slide.querySelector('img');
                if (img) {
                    img.style.objectFit = 'cover';
                    img.style.width = '100%';
                    img.style.height = '100%';
                }
            });
            
            // 克隆第一张幻灯片并添加到末尾，用于实现无缝过渡
            const firstSlideClone = slides[0].cloneNode(true);
            firstSlideClone.style.minWidth = '100%';
            firstSlideClone.style.width = '100%';
            mainCarousel.appendChild(firstSlideClone);
            
            // 轮播状态
            let currentSlide = 0;
            let isTransitioning = false;
            
            // 显示幻灯片的函数
            function showSlide(index) {
                if (isTransitioning) return;
                isTransitioning = true;
                
                // 设置过渡动画
                mainCarousel.style.transition = 'transform 0.5s ease-out';
                
                // 计算偏移量，每个幻灯片占100%
                mainCarousel.style.transform = `translateX(-${index * 100}%)`;
                
                // 动画完成后检查
                setTimeout(() => {
                    currentSlide = index;
                    
                    // 如果滚动到了克隆的幻灯片（即最后一个元素）
                    if (currentSlide >= realSlideCount) {
                        // 瞬间跳转回第一张幻灯片，无过渡效果
                        mainCarousel.style.transition = 'none';
                        currentSlide = 0;
                        mainCarousel.style.transform = 'translateX(0)';
                        
                        // 强制浏览器重新计算布局
                        void mainCarousel.offsetWidth;
                        
                        // 重新启用过渡效果
                        mainCarousel.style.transition = 'transform 0.5s ease-out';
                    }
                    
                    isTransitioning = false;
                }, 500); // 与过渡时间匹配
            }
            
            // 自动轮播 - 每5秒滚动到下一张
            setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
    }
    
    // 小轮播图滚动效果 - 修改为连续向一个方向滚动
    const smallCarousel = document.getElementById('smallCarousel');
    if (smallCarousel) {
        const items = smallCarousel.querySelectorAll('.small-carousel-item');
        if (items.length > 0) {
            // 获取真实项目数量和单个项目宽度
            const realItemCount = items.length;
            const itemWidth = 220; // 图片宽度 + 边距
            const gap = 20; // 项目间距
            const totalWidth = itemWidth + gap;
            
            // 克隆所有原始项目并添加到末尾，实现连续滚动效果
            items.forEach(item => {
                const clone = item.cloneNode(true);
                smallCarousel.appendChild(clone);
            });
            
            // 设置滚动位置和动画
            let scrollPosition = 0;
            let isTransitioning = false;
            
            // 自动滚动函数
            function autoScroll() {
                if (isTransitioning) return;
                
                // 平滑滚动到下一个完整项目位置
                isTransitioning = true;
                const nextPosition = scrollPosition + totalWidth;
                
                smallCarousel.style.transition = 'transform 0.5s ease-out';
                smallCarousel.style.transform = `translateX(-${nextPosition}px)`;
                
                // 滚动完成后检查是否需要重置
                setTimeout(() => {
                    scrollPosition = nextPosition;
                    
                    // 当滚动过原始项目总数时，重置位置实现无缝循环
                    if (scrollPosition >= realItemCount * totalWidth) {
                        // 关闭过渡，瞬间重置位置
                        smallCarousel.style.transition = 'none';
                        scrollPosition = 0;
                        smallCarousel.style.transform = `translateX(-${scrollPosition}px)`;
                    }
                    
                    isTransitioning = false;
                }, 500); // 与过渡时间匹配
            }
            
            // 设置定时器，每隔3秒滚动一个项目
            setInterval(autoScroll, 3000);
        }
    }
    
    // 确保页面加载完成后设置静态内容 - 已在DOMContentLoaded内
    // 设置友情链接静态内容
    const friendshipLinksContainer = document.getElementById('friendship-links');
    if (friendshipLinksContainer) {
        friendshipLinksContainer.innerHTML = '<span>暂无友情链接</span>';
    }
    
    // 设置快速链接静态内容
    const quickLinksContainer = document.getElementById('quick-links');
    if (quickLinksContainer) {
        quickLinksContainer.innerHTML = '<span>暂无快速链接</span>';
    }
});