from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/contact', methods=['POST'])
def contact():
    nombre = request.form.get('nombre')
    email = request.form.get('email')
    mensaje = request.form.get('mensaje')
    if nombre and email and mensaje:
        # Aquí se configuraría el envío con SMTP
        return 'Mensaje recibido correctamente.'
    return 'Faltan datos.'

if __name__ == '__main__':
    app.run(debug=True)
