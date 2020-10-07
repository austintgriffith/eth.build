var codec = require("json-url")("lzw")

export const isBrowser = typeof window !== "undefined"
export const isProduction = process.node_ENV === "production"
export const isMobile =
  isBrowser && window.matchMedia("(max-width: 767px)").matches

const compressLiteGraph = liteGraph => {
  const compressed = codec.compress(liteGraph.serialize())
  console.log(compressed)
  return compressed
}

export const downloadLiteGraph = async liteGraph => {
  const compressed = compressLiteGraph(liteGraph)
  console.log("SAVING COMPRESSED", compressed)
  let webfile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<key>URL</key>
<string>https://eth.build/${compressed}</string>
</dict>
</plist>
`
  var file = new Blob([webfile])
  var url = URL.createObjectURL(file)
  var element = document.createElement("a")
  element.setAttribute("href", url)
  element.setAttribute("download", "eth.build.webloc")
  element.style.display = "none"
  if (document.body) {
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    await setTimeout(function () {
      URL.revokeObjectURL(url)
    }, 1000 * 60)
  }
}
