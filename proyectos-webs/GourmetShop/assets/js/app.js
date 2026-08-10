document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-validate="true"]');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    document.querySelectorAll('[data-password-check]').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value;
            const valid = value.length >= 8 &&
                /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value);

            input.setCustomValidity(valid ? '' : 'La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula y número.');
            const hint = document.querySelector(input.dataset.passwordCheck);
            if (hint) {
                hint.textContent = valid
                    ? 'Contraseña segura.'
                    : 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número.';
                hint.className = valid ? 'form-text text-success' : 'form-text text-danger';
            }
        });
    });

    document.querySelectorAll('[data-confirm-delete]').forEach(form => {
        form.addEventListener('submit', event => {
            if (!confirm('¿Deseas eliminar este producto del carrito?')) {
                event.preventDefault();
            }
        });
    });

    const qtyInputs = document.querySelectorAll('[data-qty]');
    qtyInputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.value < 1) input.value = 1;
        });
    });
});
