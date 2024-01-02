$(() => {
  //Start coding here!
  fetchAccounts();
  fetchCategories();
});

/**
 * get accounts from the server.
 * If the request is successful, the data will be rendered in the select tag of the Account section.
 */
const fetchAccounts = () => {
  fetch('http://localhost:3000/accounts', {
    method: 'GET',
  })
    .then((res) => {
      res.json().then((data) => {
        // generate option tags
        const optionTags = () =>
          data.map((account) => generateOptionTag(account.id, account.username));

        // grab the account select tag from the DOM.
        const accountFilterSelectTag = $('#account-filter');
        // generate default option tag.
        const accountNotSelected = generateOptionTag(0, 'ALL');
        accountFilterSelectTag.append([accountNotSelected, ...optionTags()]);

        // grab the account select tag from the DOM.
        const accountSelectTag = $('#account');
        // add option tags to the select tag.
        accountSelectTag.append(optionTags());

        // grab the 'from' select tag from the DOM.
        const fromSelectTag = $('#from');
        fromSelectTag.append(optionTags());

        // grab the 'to' select tag from the DOM.
        const toSelectTag = $('#to');
        toSelectTag.append(optionTags());
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

/**
 * call the /categories endpoint to get all categories.
 * Then, display them in the categories list.
 */
const fetchCategories = () => {
    fetch("http://localhost:3000/categories", {
        method: "GET"
    }).then(res => {
        res.json().then(data => {
            const categoryList = $("#category");
            categoryList.append(data.map(category => generateOptionTag(category.id, category.name)));
        })
    }).catch(err => console.error(err))
}

/**
 * generate option tags for the select tag.
 * @param {number} id
 * @param {string} name
 * @returns {HTMLOptionElement} optionTag
 */
const generateOptionTag = (id, name) => {
  const optionTag = document.createElement('option');
  optionTag.value = id.toString();
  optionTag.innerText = name;
  return optionTag;
};
