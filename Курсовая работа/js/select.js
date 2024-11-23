document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.select');

    selects.forEach(select => {
        const header = select.querySelector('.select__header');
        const body = select.querySelector('.select__body');
        const title = header.querySelector('.select__title');
        const items = body.querySelectorAll('.select__item');
        const icon = header.querySelector('.select__icon');

        if (items.length) {
            items[0].classList.add('select__item_active');
            title.textContent = items[0].textContent;
        }

        header.addEventListener('click', () => {
            document.querySelectorAll('.select__body').forEach(otherBody => {
                if (otherBody !== body) {
                    otherBody.style.display = 'none';
                }
            });
            document.querySelectorAll('.select__header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('select__header_active');
                }
            });
            document.querySelectorAll('.select__icon').forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('select__icon_active');
                }
            });

            body.style.display = body.style.display === 'block' ? 'none' : 'block';
            header.classList.toggle('select__header_active');
            icon.classList.toggle('select__icon_active');
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('select__item_active'));
                item.classList.add('select__item_active');
                title.textContent = item.textContent;
                body.style.display = 'none';
                header.classList.remove('select__header_active');
                icon.classList.remove('select__icon_active');
            });
        });
    });

    document.addEventListener('click', e => {
        selects.forEach(select => {
            if (!select.contains(e.target)) {
                select.querySelector('.select__body').style.display = 'none'; // Закрываем список
                select.querySelector('.select__header').classList.remove('select__header_active');
                select.querySelector('.select__icon').classList.remove('select__icon_active');
            }
        });
    });
});
