const zxcvbnReady = Promise.all([
    import("@zxcvbn-ts/core"),
    import("@zxcvbn-ts/language-common"),
    import("@zxcvbn-ts/language-en"),
]).then(([core, common, en]) => {
    const options = {
        dictionary: {
            ...common.dictionary,
            ...en.dictionary,
        },
        graphs: common.adjacencyGraphs,
        translations: en.translations,
    };

    return new core.ZxcvbnFactory(options);
});

module.exports = zxcvbnReady;