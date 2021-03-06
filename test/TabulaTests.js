'use strict';

const LandPlot = artifacts.require("./LandPlot.sol");
const Registry = artifacts.require("./Registry.sol");

contract('TabulaTest', function(accounts) {
	beforeEach(async function() {
		/* Deploy new LandPlots */
        const plot1 = await LandPlot.new(1, 'a', accounts[0]);
        const plot2 = await LandPlot.new(2, 'b', accounts[1]); 
	});

	describe('~LandPlot Works~', function() {
		it("LandPlot properly created",
			async function() {
                const id = 'a'
                assert.equal(plot1.id, 'a')
        });
        it("Can update owner ",
            async function() {
                let newOwner = accounts[2];
                let updated = plot1.updateOwner(newOwner);
                assert.equal(newOwner, updated);
        });
        it("Can get previous owner",
            async function() {
                let currentOwner = plot1.owner;
                let prev = getPreviousOwner(currentOwner);
                assert.equal(accounts[0], prev);
        });  
	});

	describe('Registry functions', function() {
		beforeEach(async function() {
			/* Deploy new LandPlots */
            const plot1 = await LandPlot.new(1, 'a', accounts[0]);
            const plot2 = await LandPlot.new(2, 'b', accounts[1]); 
            /* Deploy a Registry */
            const registry = await Registry.new();
		});

		it("should add one Plot",
			async function() {
                const ID = 'a';
                const addedPlot = await registry.addPlot(1, 'a', accounts[0], accounts[2]);
                const plot = await registry.plots(ID)
                const expectedPlot = {ID: 'a', owner: accounts[0], newOwner: accounts[2], value: 1};
                assert.equal(plot[0], expectedPlot.value);
                assert.equal(plot[1], expectedPlot.ID);
                assert.equal(plot[2], expectedPlot.owner);
                assert.equal(plot[3], expectedPlot.newOwner);
        });
        it("should allow for the purchase of one plot",
            async function() {
                const ID = 'a';
                await registry.buyPlot('a', {from: accounts[2], value: 1});
                const expectedPlot = {ID: 'a', owner: accounts[0], newOwner: accounts[2], value: 1};
                const plot = await registry.plots(ID)
                assert.equal(plot[0], expectedPlot.value);
                assert.equal(plot[1], expectedPlot.ID);
                assert.equal(plot[2], expectedPlot.owner);
                assert.equal(plot[3], expectedPlot.newOwner);
                let updated = plot1.updateOwner(plot.newOwner);
                assert.equal(accounts[2], updated);
        });
});
});

