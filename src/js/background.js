chrome.storage.sync.get(["colors"]).then((result) => {
    if (result.colors == undefined) {
        chrome.storage.sync.set({ "colors": {"violet": "Violet", 
                                    "indigo": "Indigo",
                                    "blue": "Blue",
                                    "green": "Green",
                                    "yellow": "Yellow",
                                    "orange": "Orange",
                                    "red": "Red",
                                    "black": "Black"} }).then(() => {
        });
        chrome.storage.sync.set({"list": []});
    }
  });
chrome.storage.sync.set({"list": []});