let container = document.querySelector(".container");
let QRcontainer = document.querySelector(".qr-code-container");
let goBackBtn = document.querySelector("#edit")


let mainColorValue = document.querySelector(".maincolor");
let backgroundColorValue  = document.querySelector(".bgcolor");
console.log(backgroundColorValue);

let mainColorPicker = document.querySelector(".maincolorinput");
let backgroundColorPicker  = document.querySelector(".bgcolorinput");

mainColorPicker.addEventListener("input", () => {
    const value = mainColorPicker.value;
    mainColorValue.textContent = value;
});

backgroundColorPicker.addEventListener("input", () => {
    const value = backgroundColorPicker.value;
    backgroundColorValue.textContent = value;
});


let sizeValue  = document.querySelector(".size");
let marginValue  = document.querySelector(".space");

let marginSlider  = document.querySelector(".rangeSpace");
let sizeSlider  = document.querySelector(".rangeSize");


sizeSlider.addEventListener("input", () => {
    const value = sizeSlider.value;
    sizeValue.textContent = value;
});

marginSlider.addEventListener("input", () => {
    const value = marginSlider.value;
    marginValue.textContent = `${value} px`;
});


const dataInput = document.querySelector('.textpick');
const imageFormat = document.querySelector('input[name="format"]:checked');
let GenerateBtn = document.querySelector(".generate-btn");
let qrCodeImage = document.querySelector("#qr-code-image");



// Update the formattype variable on change
document.querySelectorAll('.typeformat').forEach(radio => {
    radio.addEventListener('change', () => {
        formattype = document.querySelector('.typeformat:checked');
    });
});

const prepareparameters = params => {
    const prepared = {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,
        format: params.format,
    };
    return prepared;
};


const displayQrCode = imgUrl => {
    qrCodeImage.setAttribute('src', imgUrl);
};

const getQrCode = parameters => {
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const urlParams = new URLSearchParams(parameters).toString();

    const fullUrl = `${baseUrl}?${urlParams}`;

    fetch(fullUrl).then(response => {
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
};

const onSubmit = () => {
    console.log("clicked");
    const data = dataInput.value
    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = imageFormat.value;

    const parameters = prepareparameters({ data, color, bgColor, size, qZone, format });

    getQrCode(parameters);
};

GenerateBtn.addEventListener("click", onSubmit);

GenerateBtn.onclick = () => {
    container.style = "display:none";
    QRcontainer.style = "display:flex";
}

goBackBtn.onclick = () => {
    container.style = "display:flex";
    QRcontainer.style = "display:none";
}

