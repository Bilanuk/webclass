class ItemForm extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
        <div class="form-container">
            <form id="addItemForm" class="col-8 col-m-10 col-s-12">
                <h2>Add Item</h2>

                <label for="name">Name</label>
                <input type="text" id="name" required>
            
                <label for="description">Description</label>
                <textarea id="description" required></textarea>
            
                <label for="imageUrl">Image URL</label>
                <input type="url" id="imageUrl" required>
            
                <button type="submit">Add</button>
            </form>
        </div>
    `;
    }
}

customElements.define("item-form", ItemForm);
