document.addEventListener('DOMContentLoaded', () => {
    const populateEducationBlock = (data, container) => {
        for (const key in data) {
            const { value, label } = data[key];

            const infoItem = document.createElement('div');
            infoItem.classList.add('education__item');

            const infoLabel = document.createElement('div');
            infoLabel.classList.add('education__label');
            infoLabel.textContent = label;

            const infoValue = document.createElement('div');
            infoValue.classList.add('education__value');
            infoValue.textContent = value;

            infoItem.appendChild(infoLabel);
            infoItem.appendChild(infoValue);

            container.appendChild(infoItem);

            const divider = document.createElement('div');
            divider.classList.add('education__divider');
            container.appendChild(divider);
        }

        if (container.lastChild) {
            container.lastChild.remove();
        }
    };

    populateEducationBlock(config.education, document.querySelector('.education__body'));
});
