if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(reg => {
      console.log("SW Registered", reg.scope);
    })
    .catch(err => {
      console.log("SW Failed");
    });

  navigator.serviceWorker.ready.then(function(reg) {
    console.log("SW Ready");
  });
}
