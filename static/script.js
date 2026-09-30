const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const clearBtn = document.getElementById("clearBtn");
const processCanvasBtn = document.getElementById("processCanvasBtn");

const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");

const statusMessage = document.getElementById("statusMessage");
const originalPreview = document.getElementById("originalPreview");
const processedPreview = document.getElementById("processedPreview");


// =====================================
// CANVAS SETUP
// =====================================

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = "black";

let drawing = false;


// =====================================
// GET CORRECT CANVAS COORDINATES
// =====================================

function getCanvasCoordinates(event) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}


// =====================================
// START DRAWING
// =====================================

canvas.addEventListener("mousedown", (event) => {

    drawing = true;

    const position = getCanvasCoordinates(event);

    ctx.beginPath();

    ctx.moveTo(
        position.x,
        position.y
    );

});


// =====================================
// DRAW
// =====================================

canvas.addEventListener("mousemove", (event) => {

    if (!drawing) {
        return;
    }

    const position = getCanvasCoordinates(event);

    ctx.lineTo(
        position.x,
        position.y
    );

    ctx.stroke();

});


// =====================================
// STOP DRAWING
// =====================================

canvas.addEventListener("mouseup", () => {

    drawing = false;

    ctx.closePath();

});


canvas.addEventListener("mouseleave", () => {

    drawing = false;

    ctx.closePath();

});


// =====================================
// CLEAR CANVAS
// =====================================

clearBtn.addEventListener("click", () => {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "white";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

});


// =====================================
// PROCESS DRAWN SKETCH
// =====================================

processCanvasBtn.addEventListener("click", async () => {

    canvas.toBlob(async (blob) => {

        if (!blob) {

            alert("Unable to create sketch image.");

            return;
        }

        const formData = new FormData();

        formData.append(
            "image",
            blob,
            "sketch.png"
        );

        await sendToBackend(formData);

    }, "image/png");

});


// =====================================
// UPLOAD IMAGE
// =====================================

uploadBtn.addEventListener("click", async () => {

    const file = imageInput.files[0];

    if (!file) {

        alert("Please select an image first.");

        return;
    }

    const formData = new FormData();

    formData.append(
        "image",
        file
    );

    await sendToBackend(formData);

});


// =====================================
// SEND IMAGE TO FLASK
// =====================================

async function sendToBackend(formData) {

    try {

        statusMessage.innerHTML =
            "<p>⏳ Processing sketch...</p>";


        const response = await fetch(
            "/process",
            {
                method: "POST",
                body: formData
            }
        );


        const data = await response.json();


        if (!data.success) {

            statusMessage.innerHTML =
                `<p>❌ ${data.message}</p>`;

            return;
        }


        statusMessage.innerHTML =
            `<p>✅ ${data.message}</p>`;


        // Original image

        originalPreview.innerHTML = `

            <img
                src="${data.original}?t=${Date.now()}"
                alt="Original Sketch"
            >

        `;


        // Processed image

        processedPreview.innerHTML = `

    <img
        src="${data.image}?t=${Date.now()}"
        alt="Processed Sketch"
    >

    <br>

    <a
        href="${data.image}"
        download="processed_sketch.png"
    >

        <button class="download-btn">
            ⬇️ Download Processed Sketch
        </button>

    </a>

    <br>

    <button
        class="ai-btn"
        id="sendToAIButton"
    >
        🚀 Send to AI Pipeline
    </button>

`;

const sendToAIButton =
    document.getElementById("sendToAIButton");


sendToAIButton.addEventListener("click", () => {

    const aiData = {
        image: data.image,
        filename: data.filename,
        width: data.width,
        height: data.height,
        format: data.format,
        ready_for_ai: data.ready_for_ai
    };


    console.log(
        "AI Pipeline Input:",
        aiData
    );


    statusMessage.innerHTML = `
        <p>
            🚀 Sketch is ready for the AI pipeline!
        </p>

        <small>
            Processed image:
            ${data.filename}
        </small>
    `;


    alert(
        "✅ Processed sketch is ready for the AI pipeline!"
    );

});
    }

    catch (error) {

        console.error(error);

        statusMessage.innerHTML =
            "<p>❌ Something went wrong.</p>";

    }

}