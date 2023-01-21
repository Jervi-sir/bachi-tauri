<template>
  <div class="details">
    <div class="row">
      <label>Ouvriers: </label>
      <span>{{  chantier_worker_day.length }} </span>
    </div>
    <div class="row">
      <label>Total dépensé: </label>
      <span>{{ chantier_day_details.total_spent }} D.A</span>
    </div>
    <div class="row">
      <label>Total investi: </label>
      <span>{{ chantier_day_details.total_invested }} D.A</span>
    </div>
    <div class="row">
      <label>Total restant: </label>
      <span>{{ chantier_day_details.total_invested - chantier_day_details.total_spent }} D.A</span>
    </div>

  </div>
 <div class="table">
    <table class="compar-table">
      <thead>
        <tr>
          <th data-pos-left="data-pos-left">Nom</th>
          <th>Téléphone</th>
          <th>Poste</th>
          <th>Heurs</th>
          <th>Paiment</th>
          <th>absence</th>
        </tr>
      </thead>
      <tbody class="compar-table_zebra">
        <tr class="chantier" v-for="(worker, index) in chantier_worker_day" v-bind:key="index">
          <td>{{ worker.name }}</td>
          <td>{{ worker.phone_number }}</td>
          <td>{{ worker.position }}</td>
          <td>{{ worker.hour_worked }}</td>
          <td class="revenue">{{ worker.revenue }} <small>D.A</small></td>
          <td>{{ worker.is_absent ? 'absent' : '' }}</td>
          <!--<td>{{ worker.is_absent == true ? worker.revenue : 'absent' }}</td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ChantierDayTable',
  props: ['chantier_worker_day', 'chantier_day_details']
}
</script>
<style scoped lang="scss">
.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-top: 0.3rem;
  margin-bottom: 0.7rem;
  .row {
    display: flex;
    gap: 1rem;
    width: 55%;
    label {
      font-weight: 800;
    }
    span {
      flex: 1;
      text-align: end;
    }
  }
}
.compar-table {
  color: black;
  background-color: white;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.42);
  overflow: hidden;
  border-radius: 1rem;
  thead {
    tr {
      background: #F7FCFF;
      color: #7B8188;
      text-align: center;
    }
  }
  .chantier:nth-child(odd) {
    background: #f7f6f6;
  }
  .chantier:nth-child(even) {
    background: white;
  }
  td {
    text-align: center;
  }
  .revenue {
    text-align: end !important;
    small {
      font-size: 10px;
    }
  }
}
</style>
