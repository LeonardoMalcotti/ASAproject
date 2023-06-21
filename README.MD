# Agent 1

## Requirements

- [x] Environment Sensing
    - [x] Store map values
    - [x] Detect other agents
    - [x] Detect parcels
- [ ] Beliefs Revision
    - [ ] Store agent beliefs history
    - [ ] Store parcel beliefs history
    - [ ] Error management
        - [ ] Correct positional error on agents
        - [ ] Apply probability model
    - [ ] Model other agent intentions
- [ ] Intention Revision
    - [ ] TODO
- [ ] Plan Elaboration
    - [ ] Static plan Library
        - [ ] TODO
    - [ ] PDDL
        - [ ] TODO
    - [ ] Update library with new pddl plans


## Beliefs management and revision

To manage and revise beliefs the agent uses function exposed by the *Belief Management Module* which act as an aggregator
for all the other *Belief Modules*, which are a sort of data layer modules that implement and exposes CRUD functions
on data that is being kept private.

### Belief Management Module

Is an aggregator module, that works as a middleware between the *Belief Modules* and the *Agent*.
It exposes CRUD functions similar to the one exposed by the *Belief Module* connected but apply additional logic to
the data in input to adjust the new beliefs and to update multiple modules at the same time.

![](/home/leo/Documents/ASA/ASAproject/documentation/beliefs_management_architecture.png)


### Belief Module

Has the functionalities of a module in a Data Layer, it manages access to the data source through CRUD operations.
They are implemented as a JavaScript module, exposing only the CRUD functions, keeping the variables that represent
the data source inaccessible.
There are two type of Belief Module, the ones that manage and represent the current beliefs and the one that keeps 
a short history of certain beliefs.

example:
> The AgentBeliefs module keeps track of the current beliefs on the position, direction, score etc. of each other agent
> the agent is aware of.
> Instead, AgentHistoryBelief keeps track of the previous states of AgentBeliefs, and it's used to take decision or 
> validate new states of the belief.