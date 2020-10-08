var codec = require("json-url")("lzw")

const compressLiteGraph = async liteGraph => {
  if (!liteGraph) return
  const compressed = await codec.compress(liteGraph.serialize())
  return compressed
}

export const decompressLiteGraph = async litegraph => {
  const decompressed = await codec.decompress(litegraph)
  return decompressed
}

export const downloadLiteGraph = async liteGraph => {
  const compressed = await compressLiteGraph(liteGraph)
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
