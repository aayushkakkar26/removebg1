async function removeBackground() {
    const apiKey = '11b577ef91af568db133342cdf5342b84fd9eb7492d6849a0a7d1f9819177ef658a148e67c0973773700e5645c55562b'; 
    const form = new FormData();
    const inputFile = document.getElementById('imageInput').files[0];
    
    form.append('image_file', inputFile);

    try {
      const response = await fetch('https://clipdrop-api.co/remove-background/v1', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: form,
      });

      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const outputImage = new Blob([buffer], { type: response.headers.get('content-type') });
        document.getElementById('originalImage').src = URL.createObjectURL(inputFile);
        document.getElementById('resultImage').src = URL.createObjectURL(outputImage);
          
        document.getElementById('processedImageContainer').style.display = 'flex';
        document.getElementById('originalImageContainer').style.display = 'flex';
       
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(outputImage);
        downloadLink.style.display = 'flex';
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function displayOriginalImage(event) {
    var input = event.target;
    var originalImage = document.getElementById("originalImage");

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        originalImage.src = e.target.result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drag(event) {
    // Allow the dragged data to be transferred
    event.dataTransfer.setData("text", event.target.id);
  }

  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var originalImage = document.getElementById("originalImage");

    // Set the src attribute of the original image
    originalImage.src = draggedElement.src;
  }
  

  
  
