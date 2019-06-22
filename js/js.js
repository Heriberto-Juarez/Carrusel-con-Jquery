class Carrusel {
    constructor(contenedorGeneral, configuraciones) {
        let that = this;
        contenedorGeneral = contenedorGeneral || null;
        configuraciones = configuraciones || {};
        this.contenedor = contenedorGeneral;
        this.s = configuraciones;
        this.elementos = null;
        this.elementosTotales = 0;
        this.elementoActual = null;
        if (!that.s.hasOwnProperty("controles")) {
            that.s.controles = true; //si no se asignó la configuración 'controles' de forma manual, tomar como valor por defecto 'verdadero'
        }
        if(!that.s.hasOwnProperty("velocidad")) {
            that.s.velocidad = 400;
        }
        this.contenedorControles = null;
        this.controlSiguiente = null;
        this.controlAnterior = null;
        this.bloqueoAvance = false;
    }

    init() {
        let that = this;
        if (this.contenedor !== null) {
            this.elementos = this.contenedor.children().not(".controles");
            this.elementosTotales = this.elementos.length;

            let elementosActivos = this.elementos.filter((e) => {
                const isActive = $(this.elementos[e]).hasClass("activo");
                if (isActive) this.elementoActual = e;
                return isActive;
            });
            if (elementosActivos.length > 1) {
                let counter = 0;
                this.elementos.each(function (e) {
                    if ($(that.elementos[e]).hasClass("activo")) {
                        counter++;
                        if (counter > 1)
                            $(that.elementos[e]).removeClass("activo");
                    }
                });
            }
            this.elementos.each((e) => {
                $(that.elementos[e]).css('height', $(that.elementos[e]).height());
                if (!$(that.elementos[e]).hasClass("activo")) {
                    $(that.elementos[e]).hide().css('opacity', 1);
                }
            });
        }
        if (that.s.controles) {
            that.crearControles();
        }
    }

    static calcularIncremento(current, destiny) {
        return destiny - current;
    }

    cambiarElementoActivo(increment) {
        let that = this;
        $(this.elementos[that.elementoActual]).slideUp(this.s.velocidad, function () {
            that.elementoActual += increment;
            $(that).removeClass("activo").css("display", '');
            $(that.elementos[that.elementoActual]).slideDown(that.s.velocidad, function () {
                $(this).css("display", '').addClass("activo");
            });
            that.actualizarControles();
            that.bloqueoAvance = false;
        });
    }

    siguiente() {
        let that = this;
        if (that.elementosTotales > 0 && that.elementoActual + 1 < that.elementosTotales && !that.bloqueoAvance) {
            that.bloqueoAvance = true;
            that.cambiarElementoActivo(1);
        }
    }

    anterior() {
        let that = this;
        if (that.elementoActual - 1 >= 0 && that.elementosTotales > 0 && !that.bloqueoAvance) {
            that.bloqueoAvance = true;
            that.cambiarElementoActivo(-1);
        }
    }

    crearControles() {
        let that = this;
        if (this.contenedorControles == null) {
            that.contenedorControles = $("<div class='controles'></div>");
            that.contenedor.append(this.contenedorControles);
            that.controlSiguiente = $("<i class='der'> &rarr; </i>");
            that.controlAnterior = $("<i class='izq'> &larr; </i>");
            let innerContainer = $("<div></div>");
            that.contenedorControles.append(innerContainer);
            innerContainer.append(that.controlAnterior);
            for (let i = 0; i < that.elementosTotales; i++) {
                let el = $("<i class='punto'>" + (i + 1) + "</i>");
                innerContainer.append(el);
                el.on("click", () => {
                    that.cambiarElementoActivo(Carrusel.calcularIncremento(that.elementoActual, i));
                });
                if (that.elementoActual === i)
                    el.addClass("activo");
            }
            innerContainer.append(that.controlSiguiente);
            this.controlSiguiente.on("click", (e) => {
                that.siguiente();
            });
            this.controlAnterior.on("click", (e) => {
                that.anterior();
            });
        }
    }

    actualizarControles() {
        let that = this;
        if (this.contenedorControles !== null) {
            let btns = that.contenedorControles.find(".punto");
            that.contenedorControles.find(".activo").removeClass("activo");
            $(btns[that.elementoActual]).addClass("activo")
        }
    }

}