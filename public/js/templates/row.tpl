<div class="row">
    <div class="description">
        <span class="name">{{=it.name}}</span>
        <span class="node-address">{{=it.nodeAddress}}</span>
        <span class="updated">{{=it.updated}}</span>
    </div>
    {{? it.payload }}
    <div class="payload">
        {{ for(var prop in it.payload) { }}
            <div class="service">
                <span class="service-name">Name : {{=prop}}</span>
                <span class="service-type">Type : {{=it.payload[prop].type}}</span>
                <span class="service-port">Port : {{=it.payload[prop].port}}</span>
            </div>
        {{ } }}
    </div>
    {{? }}
    {{? it.doc }}
    <div class="doc">
        <span class="doc-heading">Documentation:</span>
        <p class="doc-content">{{=it.doc}}<p>
    </div>
    {{?}}
</div>
