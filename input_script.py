import csv
import multiprocessing as mp
import re
import numpy as np
import datetime

class CostumerData:
  def __init__(self, data):
    self.line_ind = data[len(data) - 1]
    row = data[:len(data) - 1]
    self.errors = []
    self.data = {}
    data_cols = ['id', 'firstName', 'lastName', 'age', 'gender', 'postalCode', 'email', 'phone', 'membership', 'joinedAt', 'lastPurchase', 'totalSpending', 'averageOrderValue', 'frequency', 'preferredCategory', 'churned']
    data_cols_validations = {
      'age': self.validate_age,
      'gender': self.validate_gender,
      'email': self.validate_email,
      'phone': self.validate_phone,
      'membership': self.validate_membership,
      'preferredCategory': self.validate_preferred_category,
      'churned': self.validate_churned,
      'totalSpending': self.validate_total_spending,
      'averageOrderValue': self.validate_average_order_value
    }

    try:
      for index in range(len(row) - 1):
        if (row[index] != ''):
          if (data_cols[index] in data_cols_validations and index != 9):
            self.data[data_cols[index]] = data_cols_validations[data_cols[index]](row[index])
          elif (index == 9):
            dates = self.validate_dates(row[index], row[index + 1])
            self.data[data_cols[index]] = dates[0]
            self.data[data_cols[index + 1]] = dates[1]
            index += 1
          else:
            self.data[data_cols[index]] = row[index]
        else:
          self.data[data_cols[index]] = ""
          self.return_error(f"{data_cols[index]} is empty")
    except:
      print(row)
    for err in self.errors:
      print(f"Row: {err['rowNumber']}, Error: {err['errorDescription']}")
    
  def validate_age(self, age):
    try:
      return int(float(age))
    except:
      self.return_error(f"Age is not valid")
      return ""

  def validate_email(self, email):
    try:
      mail = str(email).lower()
      if ('@' in mail and '.' in mail):
        return mail
      else:
        raise Exception()
    except:
      self.return_error(f"Email is not valid")
      return ""

  def validate_gender(self, gender):
    try:
      if (gender in ["M", "F"]):
        return gender
      else:
        raise Exception()
    except:
      self.return_error(f"Gender format is not valid")
      return ""
  
  def validate_phone(self, phone):
    try:
      phone_num = re.sub(r'[^0-9]', '', phone)
      if (len(phone_num) >= 10):
        return phone_num
      else:
        self.return_error(f"Phone number length is not valid")
        return ""
    except:
      self.return_error(f"Phone number is not valid")
      return ""
  
  def validate_membership(self, members):
    membership = str(members).lower()
    if (membership in ["basic", "silver", "gold"]):
      if (membership == "basic"):
        return "bronze"
      return membership
    self.return_error(f"Membership is not valid")
    return ""
  
  def validate_preferred_category(self, preferred_category):
    if (preferred_category in ["Unknown", "TBD", "To Be Determined", "N/A"]):
      return ""
    return preferred_category
  
  def validate_churned(self, churned):
    if (churned in ["Y", "yes", "1"]):
      return "true"
    if (churned in ["N", "no", "0"]):
      return "false"
    self.return_error(f"Churned is not valid")
    return ""

  def validate_dates(self, joined_at, last_purchase):
    formats = ["%Y-%m-%d","%d-%m-%Y","%m-%d-%Y","%B %d, %Y","%d %B, %Y","%Y/%m/%d","%m/%d/%Y","%d/%m/%Y","%d-%b-%Y","%b %d, %Y","%Y-%m-%d %H:%M:%S","%d-%m-%Y %H:%M:%S","%m-%d-%Y %H:%M:%S","%d/%m/%Y %H:%M:%S","%Y%m%d","%y%m%d","%Y.%m.%d","%d.%m.%Y","%a, %d %b %Y","%A, %d %B %Y","%d-%b-%Y %H:%M:%S","%b %d, %Y %H:%M:%S","%Y-%m-%dT%H:%M:%S","%Y-%m-%dT%H:%M:%SZ","%Y-%m-%d %H:%M:%S.%f","%Y-%m-%d %H:%M:%S%z","%H:%M:%S"]
    joined_at_date = None
    last_purchase_date = None
    for format in formats:
      try:
        joined_at_date = datetime.datetime.strptime(joined_at, format).strftime("%Y-%m-%d")
        break
      except:
        continue
    for format in formats:
      try:
        last_purchase_date = datetime.datetime.strptime(last_purchase, format).strftime("%Y-%m-%d")
        break
      except:
        continue
    is_joined_at_date_valid = joined_at_date is not None
    is_last_purchase_date_valid = last_purchase_date is not None
    if (not is_joined_at_date_valid):
      self.return_error(f"Joined at date is not valid")
      joined_at_date = ""
    if (not is_last_purchase_date_valid):
      self.return_error(f"Last purchase date is not valid")
      last_purchase_date = ""
    if (is_joined_at_date_valid and is_last_purchase_date_valid):
      joined_at_datetime = datetime.datetime.strptime(joined_at_date, "%Y-%m-%d")
      last_purchase_datetime = datetime.datetime.strptime(last_purchase_date, "%Y-%m-%d")
      if (joined_at_datetime > last_purchase_datetime):
        self.return_error(f"Last purchase date is earlier than join date")
        joined_at_date = ""
        last_purchase_date = ""
      else:
        if (joined_at_datetime.year > 2025):
          self.return_error(f"Joined at date is in the future")
          joined_at_date = ""
        elif (joined_at_datetime.year < 2000):
          self.return_error(f"Joined at date is before 2000")
          joined_at_date = ""
        if (last_purchase_datetime.year > 2025):
          self.return_error(f"Last purchase date is in the future")
          last_purchase_date = ""
        elif (last_purchase_datetime.year < 2000):
          self.return_error(f"Last purchase date is before 2000")
          last_purchase_date = ""
    return [joined_at_date, last_purchase_date]

  def validate_total_spending(self, total_spending):
    try:
      return float(total_spending)
    except:
      self.return_error(f"Total spending is not valid")
      return ""
    
  def validate_average_order_value(self, average_order_value):
    try:
      return float(average_order_value)
    except:
      self.return_error(f"Average order value is not valid")
      return ""

  def return_error(self, error_desc):
    self.errors.append({"rowNumber" : int(self.line_ind) + 1, "errorDescription" : f"{error_desc}"})

def validate_and_transform_data(line_chunks):
  results = []
  errors = []
  for line in line_chunks:
    data = CostumerData(line)
    results.append(data.data)
    errors.extend(data.errors)
  return results, errors

def main():
  cores = mp.cpu_count()
  with open("customers.csv", "r") as file:
    test_lines = []
    reader = csv.reader(file)
    ind = 0
    for row in reader:
      if (ind == 0):
        ind += 1
        continue
      row.append(ind)
      test_lines.append(row)
      ind += 1
    
    chunks = np.array_split(test_lines, cores)
    result_datas = []
    result_errors = []
    with mp.Pool(cores) as pool:
      results = pool.map(validate_and_transform_data, chunks)

    for result in results:
      result_datas.extend(result[0])
      result_errors.extend(result[1])
    print(f"No of datas: {len(result_datas)}")
    print(f"No of errors: {len(result_errors)}")

if __name__ == "__main__":
  main()
