const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}

module.exports = {
	title: "Flowise",
	description: "Open source UI visual tool to build your customized LLM ochestration flow and AI agents.",
	icon: "icon.png",
	
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, ".git"))
	
// Si Installé
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      let launch = kernel.running(__dirname, "start.json")
      let running = launch
      let arr
	  
	  // Launcher
      if (launch) {
        arr = [
			// Running Icon
			{
			  icon: "fa-solid fa-spin fa-circle-notch",
			  text: "Running"
			},
			
			// Server Icon
			{
			  icon: "fa-solid fa-desktop",
			  text: "Server",
			  href: "start.json",
			  params: { fullscreen: true }
        }]
		
		// Open Web Icon
        if (session && session.url) {
          arr.push({
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: session.url,
            target: "_blank"
          })
        }
      } 	
	  
	  // Sinon affiche Launch Icon
	  else {
      arr = [{
          icon: "fa-solid fa-power-off",
          text: "Launch",
          href: "start.json",
          params: { fullscreen: true, run: true }
        }]
      }
	  
	  // Update Icon
      arr = arr.concat([{
        icon: "fa-solid fa-rotate",
        text: "Update",
        href: "update.json",
        params: { fullscreen: true, run: true }
      }])
	  
      return arr
	 } 
	  
	  
	  
// Si Pas Installé
else {
    arr = [
        {
            icon: "fa-solid fa-power-off",
            text: "Install",
            href: "install.json",
            params: { fullscreen: true, run: true }
        },
        {
            icon: "fa-solid fa-power-off",
            text: "Launch",
            href: "start.json",
            params: { fullscreen: true, run: true }
        }
    ];
}
	
	
  }
}