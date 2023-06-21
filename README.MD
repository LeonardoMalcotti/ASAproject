# Agent 1

## Requirements

[ ] Environment Sensing
    [ ] Store map values
    [ ] Detect other agents
    [ ] Detect parcels
[ ] Beliefs Revision
    [ ] Store agent beliefs history
    [ ] Store parcel beliefs history
    [ ] Error management
        [ ] Correct positional error on agents
        [ ] Apply probability model
    [ ] Model other agent intentions
[ ] Intention Revision
    [ ] TODO
[ ] Plan Elaboration
    [ ] Static plan Library
        [ ] TODO
    [ ] PDDL
        [ ] TODO
    [ ] Update library with new pddl plans


## Beliefs management and revision

To manage and revise beliefs the agent uses function exposed by the *Belief Management Module* which act as an aggregator
for all the other *Belief Modules*, which are a sort of data layer modules that implement and exposes CRUD functions
on data that is being kept private.

### Belief Management Module

Is an aggregator module, that works as a middleware between the *Belief Modules* and the *Agent*.
It exposes CRUD functions similar to the one exposed by the *Belief Module* connected but apply additional logic to
the data in input to adjust the new beliefs and to update multiple modules at the same time.