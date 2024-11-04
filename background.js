chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

    if (message.action === "identifySong") {
      
      console.log("HELLOOOOOO");
      
        // Store config access keys
        
        //*_____________________________________________________________________________*
        // *WOULD NEED TO BE UPDATED IF NEW LOGIN OR PROJECT WITHIN OLD LOGIN IS CREATED*
        //*_____________________________________________________________________________*
        const config = {
            host: "identify-eu-west-1.acrcloud.com",
            accessKey: "401eb9dda676a862893f3bae65011a2a",
            accessSecret: "Jc7fJQpeqeHkX28JKNVujHXYBBmR2ceSslM7hHdM"
          };
          
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const stringToSign = `POST\n/v1/identify\n${config.accessKey}\naudio\n1\n${timestamp}`;
        
        const signature = await generateHmacSHA1Signature(config.accessSecret, stringToSign);
        
        const formData = new FormData();
        formData.append("access_key", config.accessKey);
        formData.append("data_type", "audio");
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("audio", message.audioData);
  
        try {
            const response = await fetch(`https://${config.host}/v1/identify`, {
                method: "POST",
                body: formData
            });
  
        
            const result = await response.json();
            if (result.status.code === 0) {
                // Song identified successfully
                const songTitle = result.metadata.music[0].title;
                const songArtist = result.metadata.music[0].artists[0].name;
                console.log(`Identified song: ${songTitle} by ${songArtist}`);
    
            chrome.storage.local.set({ songTitle, songArtist });
            chrome.action.openPopup();  // Show popup when song is identified
            } else {
            console.error("Song identification failed.");
            }
        } catch (error) {
        console.error("Error identifying song:", error);
      }
    }
  });

  
  async function generateHmacSHA1Signature(secret, message) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(message);
  
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    );
  
    const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    return btoa(String.fromCharCode(...signatureArray));
  };