import { createSignal, createEffect, onCleanup } from 'solid-js';
import '../css/style.css';

const NotFound = () => {
    const [count, setCount] = createSignal(5);

    createEffect(() => {
        const nRemain = setInterval(() => {
            setCount(prev => prev - 1);  // 카운트를 감소
        }, 1000);

        if (count() === 0) {   // Solid.js에서는 signal을 읽을 때 함수로 호출
            clearInterval(nRemain);
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new PopStateEvent('popstate'));
        }

        onCleanup(() => {
            clearInterval(nRemain);
        });
    });

    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h3>Oops! Page not found</h3>
                    <h1><span>4</span><span>0</span><span>4</span></h1>
                </div>
                <h2>we are sorry, but the page you requested was not found</h2>
                <h2>{count()}초 후 페이지를 이동합니다.</h2>
            </div>
        </div>
    );
};

export default NotFound;
