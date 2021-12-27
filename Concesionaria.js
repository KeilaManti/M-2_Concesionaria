let autos = require("./Autos");

let concesionaria = {
   autos: autos,
   buscarPersona: function (patente) {
    let encaut = this.autos.find(function (unauto) {
       return unauto.patente == patente;
    });
    if (encaut) {
       return encaut;
    } else {
       return null;
    }
 },
   buscarAuto: function (patente) {
      let encaut = this.autos.find(function (unauto) {
         return unauto.patente == patente;
      });
      if (encaut) {
         return encaut;
      } else {
         return null;
      }
   },
   venderAuto: function (patente) {
      let aut = this.buscarAuto (patente);
      if (aut == null) {
         return null
      } else {
         if (aut.vendido == false) {
            aut.vendido = true;
            return aut;
         } else {
            return "El auto esta vendido";
         }
      }
   },
   autosParaLaVenta: function () {
      let lista = this.autos.filter(function (unauto) {
         return unauto.vendido == false;
      });
      if (lista.length == 0) {
         return null;
      } else {
         return lista;
      }
   },
   autosNuevos: function () {
      let autitos = this.autosParaLaVenta ();
      return autitos.filter(function (uauto) {
         return uauto.km < 100;
      });
   },
   listaDeVentas: function () {
      let autprecio = this.autos.filter(function (unauto) {
         return unauto.vendido == true;
      });
      return autprecio.map(function (unprecio) {
         return unprecio.precio;
      });
   },
   totalDeVentas: function () {
      let preciosautos = this.listaDeVentas ();
      if (preciosautos.length == 0) {
         return 0;
      } else {
         return preciosautos.reduce(function (cont, unpre){
            return unpre + cont;
      });
      }
   },
   puedeComprar: function (auto, persona) {
      let monto = auto.precio / auto.cuotas
      if (auto.precio <= persona.capacidadDePagoTotal && persona.capacidadDePagoEnCuotas >= monto) {
         return true;
      } else {
         return false;
      }
   },
   autosQuePuedeComprar: function (persona) {
      let autcom = this.autosParaLaVenta ();
      let puedeauto = [];
      autcom.forEach(function (elauto) {
         if (concesionaria.puedeComprar(elauto, persona) == true) {
            puedeauto.push(elauto);
         }
      });
      return puedeauto;
   }
}

let persona = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000,
}

console.log (concesionaria.autosQuePuedeComprar(persona));