
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Location GPS Data';

    let places = staticLoadPlaces();
    renderPlaces(places);
};


function staticLoadPlaces() {
    return [
        {
            name: 'St marys village',
            location: {
                // decomment the following and add coordinates:
                 lat: 53.221862599999994,
                 lng: -4.1303171999999995,
            },
        },
        {
            name: 'Dean street',
            location: {
                // decomment the following and add coordinates:
                 lat: 53.229842600000005,
                 lng: -4.1239935,
            },
        },

    ];
}

var models = [
      {
        url: './assets/test/iron.glb',
        position: '-0.565 0.376 -9.737',
        rotation: '-88.815 -177.500 0.000',
        scale: '0.9 0.9 0.9',
        info: 'Bangor, ENERGY, DEAN street DAT, https://www.bangor.ac.uk/computer-science-and-electronic-engineering/ since 1885 this building was establish and the building is very old if it is compare to other buildings, the building consumps a lot of energy every year. (Research purposes only)',
        location: {lat: 53.229842600000005, lng: -4.1239935},
    },
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
        location: {lat: 53.229842600000005, lng: -4.1239935},
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        location: {lat: 53.221862599999994, lng: -4.1303171999999995},
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
        location: {lat: 53.221862599999994, lng: -4.1303171999999995},
    },
];



var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}

